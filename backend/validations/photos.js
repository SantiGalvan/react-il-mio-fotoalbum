const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bodyData = {
    title: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'Title è un campo obbligatorio.',
            bail: true
        },
        isString: {
            errorMessage: 'Title deve essere una stringa.',
            bail: true
        },
        isLength: {
            options: { min: 3 },
            errorMessage: `Name deve essere di almeno 3 caratteri`
        },
        trim: true,
    },
    description: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'La descrizione è obbligatoria',
            bail: true
        },
        isString: {
            errorMessage: 'La descrizione non può contenere solo numeri',
            bail: true
        },
        isLength: {
            options: { min: 20 },
            errorMessage: `La descrizione deve contenere almeno 20 caratteri`
        },
        trim: true,
    },
    visible: {
        in: ['body'],
        isBoolean: {
            errorMessage: 'Visible deve essere un booleano',
            bail: true
        },
        toBoolean: true,
    },
    categories: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'La categoria è obbligatoria'
        },
        isArray: {
            errorMessage: "La categoria deve essere un array",
            bail: true
        },
        custom: {
            options: async (array) => {
                // Controllo che gli id delle categorie ricevuti siano numeri
                const typeId = array.find(id => isNaN(parseInt(id)));
                if (typeId) throw new Error('Uno o più id non sono numeri');

                // Trasformo gli id in numeri
                const intId = array.map(id => parseInt(id));

                //? Controllo se gli id delle categorie ricevuti esistano
                // Recupero tutte le categorie
                const categories = await prisma.category.findMany();
                // Recupero solo gli id delle categorie
                const categoryIds = categories.map(category => category.id);

                const ids = categoryIds.filter(id => intId.includes(id));

                if (ids.length !== intId.length) {
                    const idNotExists = intId.filter(i => !ids.includes(i));
                    throw new Error(`Gli id:${idNotExists} non sono degli id delle categorie`);
                }

                return true;
            }
        },
        customSanitizer: {
            options: (ids) => ids.map(id => ({ id: parseInt(id) }))
        }
    }
}

module.exports = {
    bodyData,
}