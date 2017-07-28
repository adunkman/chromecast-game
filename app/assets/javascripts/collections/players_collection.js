const Backbone = require("backbone")

module.exports = Backbone.Collection.extend({
  model: require("../models/player_model"),

  url: function () {
    return `/rooms/${this.room_name}/players`
  },

  initialize: function (models, {room_name}) {
    this.room_name = room_name
  }
})
