function stripYear(date) {
    var tmp = date.split('-');
    tmp.shift();
    return tmp.join('-');
}

module.exports = {
    list: [
        {name: 'name', birthday: '1989-06-25'},
        {name: 'name', birthday: '1989-06-26'}
    ],
    birthdaysOnDate: function(birthdays, date) {
        var matchingDates = birthdays.filter(function(b) {
            return stripYear(b.birthday) === stripYear(date);
        });
        return matchingDates.map(function(d) {
            return d.name;
        });
    }
};
