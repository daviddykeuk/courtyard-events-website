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
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
module.exports = {
    sendmail: function() {
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        })
    }
};