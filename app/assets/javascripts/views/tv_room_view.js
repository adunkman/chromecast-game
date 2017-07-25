const Backbone = require("backbone")

module.exports = Backbone.View.extend({
  template: require("../templates/tv_room_template"),

  initialize: function ({router, room_name}) {
    this.router = router
    this.room_name = room_name
  },

  render: function () {
    this.$el.html(this.template({
      origin: location.origin,
      room_name: this.room_name.replace(/-/g, " ")
    }))
  }
})
