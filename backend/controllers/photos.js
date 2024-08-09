const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const generateSlug = require("../utils/slug");
const errorHandler = require("../middlewares/errorHandler.js");
const { PORT, HOST } = process.env;
const dotenv = require("dotenv");
const deletePic = require("../utils/deletePic.js");
const sendEmail = require('../utils/sendEmail.js');
dotenv.config();

const store = async (req, res) => {

    const { title, description, categories } = req.body;

    // Inserimento dell'utente in automatico recuperando l'id dal token
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userEmail = decoded.email;
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    const userId = user.id;

    const photos = await prisma.photo.findMany();
    const slugs = photos.map(photo => photo.slug);

    const slug = generateSlug(title, slugs);

    const data = {
        title,
        slug,
        image: req.file ? `${HOST}:${PORT}/photos/${req.file.filename}` : '',
        description,
        userId,
        visible: req.body.visible ? req.body.visible : false,
        validated: user.isSuperAdmin ? true : false,
        categories: {
            connect: categories.map(category => ({ id: category.id }))
        }
    }

    try {

        // Creo la foto nel DB
        const photo = await prisma.photo.create({
            data,
            include: {
                categories: {
                    select: {
                        id: true,
                        label: true
                    }
                },
                user: {
                    select: {
                        name: true
                    }
                }
            }
        });

        // Se lo user non è il Super Admin invia un'email al Super Admin per la validazione della foto
        if (!user.isSuperAdmin) {

            // Recupero i dati del Super Admin per inviargli l'email
            const recipient = {
                name: process.env.SUPER_ADMIN_NAME,
                email: process.env.SUPER_ADMIN_EMAIL
            }

            // Invio l'email
            sendEmail(recipient, user, 'validated', photo);
        }

        // Restituisco uno status 200 e invio la foto appena creata
        res.status(200).send(photo);

    } catch (err) {
        if (req.file) deletePic('photos', req.file.filename);
        errorHandler(err, req, res);
    }

}

const index = async (req, res) => {
    try {

        const where = {}

        // Parametri presi dalla query
        const { title, visible, page = 1, limit = 9, user, validated } = req.query;

        // Se c'è il titolo, filtro
        if (title) {
            where.title = { contains: title }
        }

        // Filtro della visibilità
        if (visible === 'visible') {
            where.visible = true;
        } else if (visible === 'invisible') {
            where.visible = false;
        }

        // Filtro della validazione
        if (validated === 'valid') {
            where.validated = true;
        } else if (validated === 'invalid') {
            where.validated = false;
        }

        // Paginazione
        const offset = (page - 1) * limit;
        const totalItems = await prisma.photo.count({ where });
        const totalPages = Math.ceil(totalItems / limit);

        if (totalPages === 0) {
            return res.json({
                data: [],
                page,
                totalItems,
                totalPages
            });
        }

        if (page > totalPages) throw new Error(`La pagina ${page} non esiste`);

        // Variabili dove inserirò le informazioni dello user recuperato dal token
        let userId;
        let isSuperAdmin;

        // Ricavo lo user dal Token
        if (req.headers.authorization) {

            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const userEmail = decoded.email;
            const user = await prisma.user.findUnique({ where: { email: userEmail } });
            isSuperAdmin = user.isSuperAdmin;
            userId = user.id;
        }

        // Filtro dello user
        if (user === 'true' && userId) {
            where.userId = userId
        }

        // Invio solo le foto validate se non sei il Super Admin
        if (!isSuperAdmin) {
            where.validated = true;
        }

        const photos = await prisma.photo.findMany({
            where,
            orderBy: [{
                createdAt: 'desc'
            }],
            include: {
                categories: {
                    select: {
                        id: true,
                        label: true,
                        color: true
                    }
                },
                user: {
                    select: {
                        name: true
                    }
                }
            },
            take: parseInt(limit),
            skip: parseInt(offset),
        });

        res.json({
            data: photos,
            page,
            totalPages
        });

    } catch (err) {
        errorHandler(err, req, res);
    }
}

const show = async (req, res) => {
    try {
        const { slug } = req.params;

        const photo = await prisma.photo.findUnique({
            where: { slug },
            include: {
                categories: {
                    select: {
                        id: true,
                        label: true,
                        color: true
                    }
                },
                user: {
                    select: {
                        name: true
                    }
                }
            }
        })

        res.status(200).send(photo);

    } catch (err) {
        errorHandler(err, req, res);
    }
}

const update = async (req, res) => {
    try {
        const where = {}
        const { slug } = req.params;
        where.slug = slug;

        const { title, description, categories } = req.body;

        // Inserimento dell'utente in automatico recuperando l'id dal token
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decoded.email;
        const user = await prisma.user.findUnique({ where: { email: userEmail } });
        const userId = user.id;

        const photos = await prisma.photo.findMany();
        const slugs = photos.map(photo => photo.slug);
        const newSlug = generateSlug(title, slugs);

        const data = {
            title,
            slug: newSlug,
            image: req.file ? `${HOST}:${PORT}/photos/${req.file.filename}` : '',
            description,
            visible: req.body.visible ? req.body.visible : false,
            categories: {
                set: categories.map(category => ({ id: category.id }))
            }
        }

        let photo;

        if (user.isSuperAdmin) {
            photo = await prisma.photo.update({
                where,
                data,
                include: {
                    categories: {
                        select: {
                            id: true,
                            label: true,
                            color: true
                        }
                    },
                    user: {
                        select: {
                            name: true
                        }
                    }
                }
            });

        } else {

            where.userId = userId;

            photo = await prisma.photo.update({
                where,
                data,
                include: {
                    categories: {
                        select: {
                            id: true,
                            label: true,
                            color: true
                        }
                    },
                    user: {
                        select: {
                            name: true
                        }
                    }
                }
            });
        }


        res.status(200).send(photo);

    } catch (err) {
        if (req.file) deletePic('photos', req.file.filename);
        errorHandler(err, req, res);
    }
}

const destroy = async (req, res) => {
    try {

        const where = {}

        // Inserimento dell'utente in automatico recuperando l'id dal token
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decoded.email;
        const user = await prisma.user.findUnique({ where: { email: userEmail } });
        const userId = user.id;

        const { slug } = req.params;
        where.slug = slug;

        let photo;

        if (user.isSuperAdmin) {
            photo = await prisma.photo.delete({ where });
        } else {

            where.userId = userId;

            photo = await prisma.photo.delete({ where });

        }

        let imageName;

        if (photo.image.includes('http://localhost:3000/photos/')) {
            imageName = photo.image.replace('http://localhost:3000/photos/', '');

            deletePic('photos', imageName);
        }


        res.status(200).json(`Photo ${photo.title} con slug:${slug} eliminata con successo`);

    } catch (err) {
        errorHandler(err, req, res);
    }
}

const validated = async (req, res) => {
    try {

        const { slug } = req.params;

        const { validated } = req.body;

        const data = { validated };

        const photo = await prisma.photo.update({
            where: { slug },
            data,
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });

        // Recupero i dati del Super Admin per inviargli l'email
        const recipient = {
            name: photo.user.name,
            email: photo.user.email
        }

        // Invio l'email
        sendEmail(recipient, null, 'to validate', photo);

        res.status(200).send(photo);

    } catch (err) {
        errorHandler(err, req, res);
    }
}

module.exports = { store, index, show, update, destroy, validated }