const Backbone = require("backbone")

module.exports = Backbone.View.extend({
  className: "game-score",
  template: require("../templates/game_score_template"),

  render: function () {
    this.$el.html(this.template())
  }
})
