var express = require('express');
var bodyParser = require('body-parser');
var emailer = require('./emailer');
var app = express()

app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/api/send', function(req, res) {
    emailer.sendmail(req.body, function() {
        res.send("sent");
    }, function(err) {
        res.status(500).send(err);
    });
});

app.use('/', express.static('public'))

app.listen(process.env.PORT || 3000, function() {
    console.log('Example app listening on port ' + (process.env.PORT || 3000));
})