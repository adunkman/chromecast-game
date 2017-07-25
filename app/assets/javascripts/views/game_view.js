const Backbone = require("backbone")

module.exports = Backbone.View.extend({
  template: require("../templates/game_template"),

  initialize: function ({router, room_name, client_id}) {
    this.router = router
    this.room_name = room_name
    this.client_id = client_id
  },

  render: function () {
    this.$el.html(this.template())
  }
})
