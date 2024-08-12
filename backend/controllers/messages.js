const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const errorHandler = require("../middlewares/errorHandler.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const formattedDate = require("../utils/formattedDate.js");
const sendEmail = require('../utils/sendEmail.js');
dotenv.config();

const store = async (req, res) => {
    const { content, email, userId, photoId } = req.body;

    const data = {
        email,
        content,
        userId: userId ? parseInt(userId) : 7,
        photoId: photoId ? photoId : null
    }

    try {

        const message = await prisma.message.create({ data });

        if (data.userId === 7) {

            // Recupero i dati del Super Admin per inviargli l'email
            const recipient = {
                name: process.env.SUPER_ADMIN_NAME,
                email: process.env.SUPER_ADMIN_EMAIL
            }

            // Invio l'email
            sendEmail(recipient, null, 'message', message);
        }

        res.status(200).send(message);

    } catch (err) {
        errorHandler(err, req, res);
    }
}

const index = async (req, res) => {
    try {

        const where = {}

        // Parametri presi dalla query
        const { filteredUser } = req.query;


        // Inserimento dell'utente in automatico recuperando l'id dal token
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decoded.email;
        const user = await prisma.user.findUnique({ where: { email: userEmail } });
        const userId = user.id;

        if (filteredUser === 'true') where.userId = userId

        let messages

        if (user.isSuperAdmin && filteredUser !== 'true') {

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

        const dates = messages.map(message => message.createdAt);

        for (let i = 0; i < dates.length; i++) {

            messages[i].createdAt = formattedDate(dates[i]);
        }

        res.status(200).send(messages);

    } catch (err) {
        errorHandler(err, req, res);
    }
}

const show = async (req, res) => {
    try {

        const { id } = req.params;

        const message = await prisma.message.findUnique({
            where: { id: parseInt(id) },
            include: {
                photo: {
                    select: {
                        title: true,
                        slug: true,
                    }
                }
            }
        });

        message.createdAt = formattedDate(message.createdAt);

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