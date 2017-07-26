const Backbone = require("backbone")

module.exports = Backbone.Collection.extend({
  model: require("../models/game"),

  url: function () {
    return `/rooms/${this.room_name}/games`
  },

  initialize: function ({room_name}) {
    this.room_name = room_name
  }
})
