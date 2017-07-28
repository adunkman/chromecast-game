const Backbone = require("backbone")

module.exports = Backbone.Collection.extend({
  model: require("../models/game_model"),

  url: function () {
    return `/rooms/${this.room_name}/games`
  },

  initialize: function (models, {room_name}) {
    this.room_name = room_name
  },

  unfinished: function () {
    return this.filter((m) => m.is_unfinished())
  }
})
