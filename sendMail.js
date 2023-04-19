const nodemailer = require('nodemailer');

async function sendMail(htmlBody,targetEmail,gmailAuth){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: gmailAuth
        });
    
    var mailOptions = {
        from: gmailAuth['user'],
        to: targetEmail,
        subject: 'Weather Data (Berlin|Jakarta)',
        html: htmlBody,
    };
    
    try{
        await transporter.sendMail(mailOptions);
        return null
    } catch {
        return 'Please provide a valid E-mail.'
    }
}

module.exports = sendMail