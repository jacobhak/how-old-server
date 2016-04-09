var assert = require('assert');
var birthdays = require('../birthdays');

describe('birthdays', function() {
    describe('birthdaysOnDate', function() {
        var b = [
            {name: 'test', birthday: '1989-06-25'},
            {name: 'test2', birthday: '1989-06-26'}
        ];
        it('returns all birthdays on a given date', function() {
            var result = birthdays.birthdaysOnDate(b, '2015-06-25');
            assert.deepEqual(['test'], result);
        });
        it('returns an empty list if no birthdays were found', function() {
            assert.deepEqual([], birthdays.birthdaysOnDate([], '2015-06-25'));
        });
    });
});
