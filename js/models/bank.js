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
