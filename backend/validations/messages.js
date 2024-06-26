const bodyData = {
    content: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'il contenuto è obbligatorio',
            bail: true
        },
        isString: {
            errorMessage: 'Il contenuto non può contenere solo da numeri',
            bail: true
        },
        isLength: {
            options: { min: 10 },
            errorMessage: `Il contenuto deve contenere almeno 10 caratteri`
        },
        trim: true,
    },
    email: {
        in: ['body'],
        notEmpty: {
            errorMessage: 'L\'email è obbligatoria',
            bail: true
        },
        isEmail: {
            errorMessage: 'Email non valida',
            bail: true
        },
        trim: true,
    }
}

module.exports = {
    bodyData,
}