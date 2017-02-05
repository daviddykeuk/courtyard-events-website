const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.emailuser,
        pass: process.env.emailpassword
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: process.env.emailfrom, // sender address
    to: process.env.emailto, // list of receivers
    subject: 'Message from courtyard events', // Subject line
    html: "Hi, <br/><br/> You recieved a message from Courtyard Events<br/><br/>"
};

// send mail with defined transport object
module.exports = {
    sendmail: function(data, callback, err) {
        mailOptions.html += "Name: <strong>" + data.name + "</strong><br/>";
        mailOptions.html += "Email: <strong>" + data.phone + "</strong><br/>";
        mailOptions.html += "Phone: <strong>" + data.email + "</strong><br/>";
        mailOptions.html += "Message: <strong>" + data.message + "</strong><br/>";
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                if (err) err(error);
            } else {
                console.log('Message %s sent: %s', info.messageId, info.response);
                callback("sent");
            }
        })
    }
};