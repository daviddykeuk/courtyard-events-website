var Mailjet = require('node-mailjet').connect(process.env.mailjetkey, process.env.mailjetsecret);

module.exports = {
    sendmail: function(data, callback, err) {
        var html = "Hi,\n\nYou recieved a message from Courtyard Events\n\n"
        html += "Name: " + data.name + "\n";
        html += "Email: " + data.phone + "\n";
        html += "Phone: " + data.email + "\n";
        html += "Message: " + data.message + "\n";

        var sendEmail = Mailjet.post('send');

        var emailData = {
            'FromEmail': process.env.emailfrom,
            'FromName': 'Courtyard Events',
            'Subject': 'Message from courtyard events',
            'Text-part': html,
            'Recipients': [{ 'Email': process.env.emailto }]
        }

        sendEmail
            .request(emailData)
            .then(callback)
            .catch(err);

    }
}