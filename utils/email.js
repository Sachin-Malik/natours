const nodeMailer = require('nodemailer');

const sendEmail = async options => {
    //1. create a transporter
    const transporter = nodeMailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user:process.env.EMAIL_USER_NAME,
            pass:process.env.EMAIL_PASSWORD
        }
    });

    //2. create the mail options
    const mailOptions = {
        from:'Sachin Malik <coder.io>',
        to:options.email,
        subject:options.subject,
        text:options.message
    };

    //3. send the mail
    await transporter.sendMail(mailOptions);
    
}

module.exports = sendEmail;