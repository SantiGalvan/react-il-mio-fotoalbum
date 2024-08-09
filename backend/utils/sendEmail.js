const brevo = require('@getbrevo/brevo');
const dotenv = require('dotenv');
dotenv.config();
const emailToValidate = require('./htmlContents.js');


// Funzione che invia l'email alla quale bisogna specificare l'utente che la invia, l'oggetto dell'email, a chi inviarla, se è per la validazione e l'oggetto da validare
const sendEmail = async (recipient, user, validated, object) => {

    // Recupero le apiKey
    const apiKey = process.env.EMAIL_API_KEY;
    const validatedApiKey = process.env.VALIDATED_EMAIL_API_KEY;

    // Creo l'apiInstance
    const apiInstance = new brevo.TransactionalEmailsApi();

    // Se è un'email per la validazione setto l'apiKey dell'email di validazione altrimenti lascio l'email del SuperAdmin
    if (validated) {

        apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, validatedApiKey);

    } else {

        apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);
    }


    try {

        const sendSmtpEmail = new brevo.SendSmtpEmail();

        let subject;
        if (validated) {
            subject = 'Email per la validazione di una nuova foto'
        }

        // Oggetto dell'email
        sendSmtpEmail.subject = subject ? subject : 'Email di PhotoBlog';

        // A chi invii l'email
        sendSmtpEmail.to = [{ email: recipient.email, name: recipient.name }];

        // Contenuto dell'email
        sendSmtpEmail.htmlContent = validated ? emailToValidate(user, object) : '';

        // Chi invia l'email | se è per la validazione l'email di validazione, senno l'email del Super Admin
        if (validated) {

            sendSmtpEmail.sender = {
                name: process.env.VALIDATED_NAME,
                email: process.env.VALIDATED_EMAIL
            }

        } else {

            sendSmtpEmail.sender = {
                name: process.env.SUPER_ADMIN_NAME,
                email: process.env.SUPER_ADMIN_EMAIL
            }

        }

        const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

        console.log(result);

    } catch (err) {
        console.error(err);
    }
}

module.exports = sendEmail;