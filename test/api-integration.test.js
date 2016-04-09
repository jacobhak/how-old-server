var assert = require('assert');
var superagent = require('superagent');
var server = require('../server');
var birthdays = require('../birthdays');
var status = require('http-status');

describe('/birthday', function() {
    var app;

    before(function() {
        app = server(3000);
    });

    after(function() {
        app.close();
    });

    it('returns all birthdays if no param is provided', function(done) {
        birthdays.list = [
            {name: 'test', birthday: '1989-06-25'},
            {name: 'test2', birthday: '1989-06-26'}
        ];
        superagent.get('http://localhost:3000/birthday').end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            var result = JSON.parse(res.text);
            assert.deepEqual(birthdays.list, result);
            done();
        });
    });

    it('returns all people that has a birthday on `params.date`', function(done) {
        birthdays.list = [
            {name: 'test', birthday: '1989-06-25'},
            {name: 'test2', birthday: '1989-06-26'}
        ];
        superagent.get('http://localhost:3000/birthday/2015-06-25').end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.OK);
            var result = JSON.parse(res.text);
            assert.deepEqual(['test'], result);
            done();
        });
    });

    it('returns 404 if no one has a birthday on `params.date`', function(done) {
        birthdays.list = [
            {name: 'test2', birthday: '1989-06-26'}
        ];
        superagent.get('http://localhost:3000/birthday/1901-01-01').end(function(err, res) {
            assert.ifError(err);
            assert.equal(res.status, status.NOT_FOUND);
            var result = JSON.parse(res.text);
            assert.deepEqual({ error: 'Not Found' }, result);
            done();
        });
    });
});
