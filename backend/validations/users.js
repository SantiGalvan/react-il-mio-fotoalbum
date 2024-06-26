const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const registerBody = {
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'L\'email è obbligatoria',
            bail: true
        },
        isEmail: {
            errorMessage: 'Email non valida',
            bail: true
        },
        custom: {
            options: async (value) => {
                const user = await prisma.user.findUnique({
                    where: { email: value }
                });

                if (user) throw new Error('Esista già un utente con questa email');

                return true;
            }
        },
        trim: true,
    },
    name: {
        in: ["body"],
        isString: {
            errorMessage: 'Il nome non può contenere solo da numeri',
            bail: true
        },
        isLength: {
            errorMessage: 'Il nome deve contenere almeno 3 caratteri',
            options: { min: 3 }
        },
        trim: true,
    },
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'La password è obbligatoria',
            bail: true
        },
        isString: {
            errorMessage: 'La password non può contenere solo da numeri',
            bail: true
        },
        isLength: {
            errorMessage: 'La password deve contenere almeno 8 caratteri',
            options: { min: 8 }
        },
        trim: true,
    }
}

const loginBody = {
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'L\'email è obbligatoria',
            bail: true
        },
        isEmail: {
            errorMessage: 'Email non valida',
        }
    },
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'La password è obbligatoria',
            bail: true
        },
        isString: {
            errorMessage: 'La password non può contenere solo numeri',
        }
    }
}

module.exports = { registerBody, loginBody }