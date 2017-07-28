const Backbone = require("backbone")

module.exports = Backbone.View.extend({
  template: require("../templates/tv_game_completed_template"),

  initialize: function () {
  },

  render: function () {
    this.$el.html(this.template(this.render_attrs()))
  },

  render_attrs: function () {
    return {}
  }
})
