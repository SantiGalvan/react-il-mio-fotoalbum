const { PrismaClient } = require("@prisma/client");
const generateSlug = require("../utils/slug");
const prisma = new PrismaClient();

const store = async (req, res) => {

    const { title, description, categories } = req.body;

    const posts = await prisma.photo.findMany();
    const slugs = posts.map(post => post.slug);

    const slug = generateSlug(title, slugs);

    const data = {
        title,
        slug,
        image: '',
        description,
        visible: req.body.visible ? req.body.visible : false,
        categories: {
            connect: categories.map(id => ({ id: parseInt(id) }))
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
                }
            }
        });

        res.status(200).send(photo);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
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
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const show = async (req, res) => { }

const update = async (req, res) => { }

const destroy = async (req, res) => { }

module.exports = { store, index, show, update, destroy }