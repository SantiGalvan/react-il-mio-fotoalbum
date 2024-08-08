const brevo = require('@getbrevo/brevo');
const dotenv = require('dotenv');
dotenv.config();
const apiKey = process.env.EMAIL_API_KEY;

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys, apiKey);

const sendEmail = async (user, subject) => {
    try {

        const sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.subject = subject ? subject : 'Email di PhotoBlog';
        sendSmtpEmail.to = { email: user.email, name: user.name };
        sendSmtpEmail.htmlContent = '';
        sendSmtpEmail.sender = {
            name: 'Santi Galvan',
            email: 'photoalbumcollector@gmail.com'
        }

        const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

        console.log(result);

    } catch (err) {
        console.error(err);
    }
}

module.exports = sendEmail;