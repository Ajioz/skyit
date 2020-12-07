const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
const DOMAIN = "";

const auth ={
    auth: {
        api_key: ' ',
        domain: DOMAIN
    }
};

// Mailer transport
let transporter = nodemailer.createTransport(mailGun(auth));

//Send mail method
const sendMail = (first_name, last_name, email, message, cb) => {
    let mailOptions = { 
        from: email, 
        to: 'ajiozglobal@gmail.com', 
        subject: first_name + ' ' + last_name + ' contacted', 
        text: message
    }; 
    
    transporter.sendMail(mailOptions, function(err, data) { 
        if(err) { 
            cb(err, null); 
        } else { 
            cb(null, data); 
        } 
    });
}

module.exports = sendMail;