const { PrismaClient } = require("@prisma/client");
const generateSlug = require("../utils/slug");
const prisma = new PrismaClient();

const store = async (req, res) => {
    const { label, color } = req.body;

    const categories = await prisma.category.findMany();
    const slugs = categories.map(category => category.slug);

    const slug = generateSlug(label, slugs);

    const data = {
        label,
        slug,
        color
    }

    try {

        const category = await prisma.category.create({ data });
        res.status(200).send(category);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const index = async (req, res) => {
    try {

        const categories = await prisma.category.findMany();
        res.status(200).send(categories);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const show = async (req, res) => { }

const update = async (req, res) => { }

const destroy = async (req, res) => { }

module.exports = { store, index, show, update, destroy }