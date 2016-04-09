var express = require('express');
var status = require('http-status');
var birthdays = require('./birthdays');

var createServer = function(port) {
    var app = express();

    app.get('/birthday', function(req, res) {
        res.json(birthdays.list);
    });
    
    app.get('/birthday/:date', function(req, res) {
        var birthdaysOnDate = birthdays.birthdaysOnDate(birthdays.list, req.params.date);
        if (birthdaysOnDate.length === 0) {
            res.status(status.NOT_FOUND).json({ error: 'Not Found' });
        } else {
            res.json(birthdaysOnDate);
        }
    });

    return app.listen(port);
};

module.exports = createServer;
