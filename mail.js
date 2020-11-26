const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
const DOMAIN = "sandboxa97dedff5a5f415da636446785387ec5.mailgun.org";

const auth ={
    auth: {
        api_key: 'e2d73da01ef5875b82a4d740e29f42d0-360a0b2c-24b7453a',
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