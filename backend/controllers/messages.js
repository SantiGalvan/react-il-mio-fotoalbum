const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const store = async (req, res) => { }

const index = async (req, res) => {
    try {

        const messages = await prisma.message.findMany();
        res.status(200).send(messages);

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const show = async (req, res) => { }

const destroy = async (req, res) => { }


module.exports = { store, index, show, destroy }