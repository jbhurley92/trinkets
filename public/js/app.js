(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var bank = require('./models/bank');
var Wallet = require('./models/wallet');
var Materials = require('./views/functions');
var Buysell = require('./views/formulas');

window.addEventListener('load', function () {

    function periodic() {
        bank(store);
    }

    function store(price) {
        wallet.setPrice(price);
    }

    setInterval(periodic, 3000);

    var wallet = new Wallet();
    wallet.set('coins', 400);

    var materials = new Materials({
        el: document.getElementById('resources'),
        model: wallet
    });

    var buysell = new Buysell({
        el: document.getElementById('controls'),
        model: wallet
    });
    function autoBuySell(price) {
        if (price <= 44.6) {
            wallet.buy();
        } else if ( price >= 61.5) {
            wallet.sell();
        }
    };

    function autoTrading() {
        bank(autoBuySell);
    };

    var startTrade = window.setInterval(autoTrading, 1000);

    var start = document.getElementById('start');
    start.addEventListener('click', function () {
        startTrade = window.setInterval(autoTrading, 1000);
        console.log('auto-trade ON');
        stop.classList.remove('off');
        start.classList.add('on');
    });
    var stop = document.getElementById('stop');
    stop.addEventListener('click', function () {
        console.log('auto-trade OFF');
        window.clearInterval(startTrade);
        start.classList.remove('on');
        stop.classList.add('off');
    });


});

},{"./models/bank":2,"./models/wallet":3,"./views/formulas":4,"./views/functions":5}],2:[function(require,module,exports){
module.exports = function bank(store) {

    var req = new XMLHttpRequest();
      req.open('GET', 'http://trinkets.queencityiron.com/price');
      req.onload = function trinks() {
         var data = JSON.parse(req.responseText);

         var exchange = document.getElementById('exchange');
         exchange.textContent = Math.round(data.price * 10) / 10;

         store(data.price);
      }; // end onload function.
      req.send();

};

},{}],3:[function(require,module,exports){
module.exports = Backbone.Model.extend({
    defaults: {
        coins: 0,
        price: 0,
        trinkets: 0,
    },
    buy: function() {
        if (this.get('coins') >= this.get('price')) {
            this.set('coins', this.get('coins') - this.get('price'));
            this.set('trinkets', this.get('trinkets') + 1);
            console.log('Purchased 1 trinket!');
      }
    },
    sell: function() {
        if (this.get('trinkets') > 0) {
            this.set('coins', this.get('coins') + this.get('price'));
            this.set('trinkets', this.get('trinkets') - 1);
            console.log('Sold 1 trinket!');
      }
    },
    buy5: function() {
        if (this.get('coins') >= this.get('price') * 5) {
            this.set('coins', this.get('coins') - this.get('price') * 5);
            this.set('trinkets', this.get('trinkets') + 5);
            console.log('Purchased 5 trinkets!');
        }
    },
    sell5: function() {
        if (this.get('trinkets') >= 5) {
            this.set('coins', this.get('coins') + this.get('price') * 5);
            this.set('trinkets', this.get('trinkets') - 5);
            console.log('Sold 5 trinkets!');
      }
    },
    setPrice: function(newP) {
        this.set('price', newP);
        console.log('The current trinket price is: ' + this.get('price'));
    },
    
});

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
module.exports = Backbone.View.extend({
   initialize: function() {
      this.render();
      this.model.on('change', this.render, this);
   },
   render: function() {
      document.getElementById('coin-wealth').textContent = Math.round(this.model.get('coins') * 10) / 10;
      document.getElementById('trinket-wealth').textContent = this.model.get('trinkets');
   }
});

},{}]},{},[1])