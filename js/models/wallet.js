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
