const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const store = async (req, res) => {
    const { content, email } = req.body;

    const data = {
        email,
        content,
        userId: 7
    }

    try {

        const message = await prisma.message.create({ data });
        res.status(200).send(message);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const index = async (req, res) => {
    try {

        const messages = await prisma.message.findMany();
        res.status(200).send(messages);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const show = async (req, res) => {
    try {

        const { id } = req.params;

        const message = await prisma.message.findUnique({ where: { id: parseInt(id) } });
        res.status(200).send(message);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error')
    }
}

const destroy = async (req, res) => { }


module.exports = { store, index, show, destroy }