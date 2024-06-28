const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const errorHandler = require("../middlewares/errorHandler.js");
const jwt = require("jsonwebtoken");

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
        errorHandler(err, req, res);
    }
}

const index = async (req, res) => {
    try {

        // Inserimento dell'utente in automatico recuperando l'id dal token
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decoded.email;
        const user = await prisma.user.findUnique({ where: { email: userEmail } });
        const userId = user.id;

        let messages

        if (user.isSuperAdmin) {

            messages = await prisma.message.findMany({
                orderBy: [
                    { createdAt: 'desc' }
                ], include: {
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                }
            });
            res.status(200).send(messages);

        } else {

            messages = await prisma.message.findMany({
                where: { userId },
                orderBy: [
                    { createdAt: 'desc' }
                ], include: {
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                }
            });
        }

        res.status(200).send(messages);

    } catch (err) {
        errorHandler(err, req, res);
    }
}

const show = async (req, res) => {
    try {

        const { id } = req.params;

        const message = await prisma.message.findUnique({ where: { id: parseInt(id) } });
        res.status(200).send(message);

    } catch (err) {
        errorHandler(err, req, res);
    }
}

const destroy = async (req, res) => {
    try {

        const { id } = req.params;

        // Inserimento dell'utente in automatico recuperando l'id dal token
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decoded.email;
        const user = await prisma.user.findUnique({ where: { email: userEmail } });
        const userId = user.id;

        let message;

        if (user.isSuperAdmin) {
            message = await prisma.message.delete({ where: { id: parseInt(id) } });
        } else {
            message = await prisma.message.delete({ where: { id: parseInt(id), userId } });
        }

        res.status(200).send(`Messaggio ${message.content} con id:${id} eliminato con successo`);

    } catch (err) {
        errorHandler(err, req, res);
    }
}


module.exports = { store, index, show, destroy }