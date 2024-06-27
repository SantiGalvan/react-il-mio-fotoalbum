const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const validationSlug = {
    slug: {
        in: ["params"],
        custom: {
            options: async (value) => {
                const slug = await prisma.photo.findUnique({ where: { slug: value } });

                if (!slug) throw new Error(`Non esiste un post con slug: ${value}`);

                return true;
            }

        }
    }
}

const validationCategorySlug = {
    slug: {
        in: ["params"],
        custom: {
            options: async (value) => {
                const slug = await prisma.category.findUnique({ where: { slug: value } });

                if (!slug) throw new Error(`Non esiste una categoria con slug:${value}`);

                return true;
            }

        }
    }
}

const validationMessageId = {
    id: {
        in: ["params"],
        isInt: {
            errorMessage: "Id deve essere un numero intero",
        },
        custom: {
            options: async (value) => {
                const id = await prisma.message.findUnique({ where: { id: parseInt(value) } });

                if (!id) throw new Error(`Non esiste un messaggio con id:${value}`);

                return true;
            }
        },
        toInt: true,
    }
}

module.exports = { validationSlug, validationCategorySlug, validationMessageId };