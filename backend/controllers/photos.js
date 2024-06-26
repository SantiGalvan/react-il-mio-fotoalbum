const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const generateSlug = require("../utils/slug");
const errorHandler = require("../middlewares/errorHandler.js");

const store = async (req, res) => {

    const { title, description, categories } = req.body;

    const photos = await prisma.photo.findMany();
    const slugs = photos.map(photo => photo.slug);

    const slug = generateSlug(title, slugs);

    const data = {
        title,
        slug,
        image: '',
        description,
        visible: req.body.visible ? req.body.visible : false,
        categories: {
            connect: categories.map(category => ({ id: category.id }))
        }
    }

    try {

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

        res.status(200).send(photo);

    } catch (err) {
        errorHandler(err, req, res); (err);
    }

}

const index = async (req, res) => {
    try {

        const where = {}

        // Parametri presi dalla query
        const { title, visible, page = 1, limit = 10 } = req.query;

        // Se c'è il titolo, filtro
        if (title) {
            where.title = { contains: title }
        }

        // Filtro della visibilità
        if (visible === 'true') {
            where.visible = true;
        } else if (visible === 'false') {
            where.visible = false;
        }

        // Paginazione
        const offset = (page - 1) * limit;
        const totalItems = await prisma.photo.count({ where });
        const totalPages = Math.ceil(totalItems / limit);

        if (page > totalPages) throw new Error(`La pagina ${page} non esiste`);

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
        errorHandler(err, req, res); (err);
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
        errorHandler(err, req, res); (err);
    }
}

const update = async (req, res) => {
    try {
        const { slug } = req.params;

        const { title, description, categories } = req.body;

        const photos = await prisma.photo.findMany();
        const slugs = photos.map(photo => photo.slug);
        const newSlug = generateSlug(title, slugs);

        const data = {
            title,
            slug: newSlug,
            image: '',
            description,
            visible: req.body.visible ? req.body.visible : false,
            categories: {
                set: categories.map(category => ({ id: category.id }))
            }
        }

        const photo = await prisma.photo.update({
            where: { slug },
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

        res.status(200).send(photo);

    } catch (err) {
        errorHandler(err, req, res); (err);
    }
}

const destroy = async (req, res) => {
    try {
        const { slug } = req.params;
        const photo = await prisma.photo.delete({ where: { slug } });

        res.status(200).json(`Photo ${photo.title} con slug:${slug} eliminata con successo`);

    } catch (err) {
        errorHandler(err, req, res); (err);
    }
}

module.exports = { store, index, show, update, destroy }