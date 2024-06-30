const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hashPassword, comparePassword } = require("../utils/password.js");
const generateToken = require("../utils/generateToken.js");
const errorHandler = require("../middlewares/errorHandler.js");

const register = async (req, res) => {
    try {
        const { email, name, password } = req.body;

        const data = {
            email,
            name,
            password: await hashPassword(password)
        }

        const user = await prisma.user.create({ data });

        const token = generateToken({
            email: user.email,
            name: user.name,
            isAdmin: false,
            isSuperAdmin: false
        });

        delete user.id;
        delete user.password;

        res.status(200).json({ token, data: user });

    } catch (err) {
        errorHandler(err, req, res);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error('Email errata');

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) throw new Error('Password errata');

        const token = generateToken({
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
            isSuperAdmin: user.isSuperAdmin
        });

        delete user.id;
        delete user.password;

        res.status(200).json({ token, data: user });

    } catch (err) {
        errorHandler(err, req, res);
    }
}

const index = async (req, res) => {
    try {

        const users = await prisma.user.findMany({
            orderBy: [{
                isSuperAdmin: 'desc'
            },
            {
                isAdmin: 'desc'
            }]
        });

        users.find(user => {
            delete user.id;
            delete user.password;
        });

        res.status(200).json(users);

    } catch (err) {
        errorHandler(err, req, res);
    }
}

const patch = async (req, res) => {
    try {

        const { email } = req.params;

        const { isAdmin } = req.body;

        const data = { isAdmin: isAdmin === 'true' ? true : false }

        const user = await prisma.user.update({
            where: { email },
            data
        });

        delete user.id;
        delete user.password;

        res.status(200).send(user);

    } catch (err) {
        errorHandler(err, req, res);
    }
}

const destroy = async (req, res) => {
    try {

        const { email } = req.params;

        const user = await prisma.user.delete({ where: { email } });
        res.status(200).send(`User ${user.name} con email: ${email} eliminato con successo`);

    } catch (err) {
        errorHandler(err, req, res);
    }
}

module.exports = { register, login, index, destroy, patch }
