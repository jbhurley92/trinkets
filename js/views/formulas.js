module.exports = Backbone.View.extend({
    events: {
        'click #buy': 'buy',
        'click #sell': 'sell',
        'click #buy5': 'buy5',
        'click #sell5': 'sell5',
       },
    buy: function() {
        this.model.buy();
        var log = document.getElementById('log-wealth2');
        var logs = document.createElement('li');
        log.appendChild(logs).innerHTML = this.model.log();
    },
    sell: function() {
        this.model.sell();
        var log = document.getElementById('log-wealth2');
        var logs = document.createElement('li');
        log.appendChild(logs).innerHTML = this.model.log2();
    },
    buy5: function() {
        this.model.buy5();
        var log = document.getElementById('log-wealth2');
        var logs = document.createElement('li');
        log.appendChild(logs).innerHTML = this.model.log3();
    },
    sell5: function() {
        this.model.sell5();
        var log = document.getElementById('log-wealth2');
        var logs = document.createElement('li');
        log.appendChild(logs).innerHTML = this.model.log4();
    },
});
