const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const generateSlug = require("../utils/slug");
const errorHandler = require("../middlewares/errorHandler.js");

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
        errorHandler(err, req, res);
    }
}

const index = async (req, res) => {
    try {

        const categories = await prisma.category.findMany();
        res.status(200).send(categories);

    } catch (err) {
        errorHandler(err, req, res);
    }
}

const show = async (req, res) => {
    try {

        const { slug } = req.params;

        const category = await prisma.category.findUnique({ where: { slug } });
        res.status(200).send(category);

    } catch (err) {
        errorHandler(err, req, res);
    }
}

const update = async (req, res) => {
    try {

        const { slug } = req.params;

        const { label, color } = req.body;

        const categories = await prisma.category.findMany();
        const slugs = categories.map(category => category.slug);
        const newSlug = generateSlug(label, slugs);

        const data = {
            label,
            color,
            slug: newSlug
        }

        const category = await prisma.category.update({
            where: { slug },
            data
        });
        res.status(200).send(category);

    } catch (err) {
        errorHandler(err, req, res);
    }
}

const destroy = async (req, res) => {
    try {

        const { slug } = req.params;

        const category = await prisma.category.delete({ where: { slug } });
        res.status(200).send(`Categoria ${category.label} con slug:${slug} eliminata con successo`);

    } catch (err) {
        errorHandler(err, req, res);
    }
}

module.exports = { store, index, show, update, destroy }