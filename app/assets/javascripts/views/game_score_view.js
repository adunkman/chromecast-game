const Backbone = require("backbone")

module.exports = Backbone.View.extend({
  template: require("../templates/game_score_template"),

  render: function () {
    this.$el.html(this.template())
  }
})
