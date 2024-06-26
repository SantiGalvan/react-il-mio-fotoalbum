const bodyData = {
    label: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'il titolo è obbligatorio',
            bail: true
        },
        isString: {
            errorMessage: 'Il titolo non può contenere solo da numeri',
            bail: true
        },
        isLength: {
            options: { min: 5 },
            errorMessage: `Il titolo deve contenere almeno 5 caratteri`
        },
        trim: true,
    }
}

module.exports = {
    bodyData,
}