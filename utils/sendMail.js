const nodemailer = require('nodemailer');





const sendMail = async (otp, email)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL, 
            pass: process.env.MAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    const mailOptions = {
        from: process.env.MAIL ,
        to: 'dzmimad6@gmail.com',
        subject: 'nebtha Otp', 
        text: `your nebtha verification code is ${otp}`
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}


module.exports = sendMail