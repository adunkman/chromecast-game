const Backbone = require("backbone")

module.exports = Backbone.Collection.extend({
  model: require("../models/player_model"),

  url: function () {
    return `/rooms/${this.room_name}/players`
  },

  initialize: function () {
    this.poll_for_updates_just_in_case()
  },

  poll_for_updates_just_in_case: function () {
    if (this.room_name) { this.fetch() }
    setTimeout(this.poll_for_updates_just_in_case.bind(this), 2000)
  }
})
