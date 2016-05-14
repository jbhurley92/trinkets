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
