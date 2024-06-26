const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { hashPassword, comparePassword } = require("../utils/password.js");
const generateToken = require("../utils/generateToken.js");

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
        console.error(err);
        res.status(500).send('Server Error');
    }
}

const login = (req, res) => { }

const index = (req, res) => { }

module.exports = { register, login, index }
