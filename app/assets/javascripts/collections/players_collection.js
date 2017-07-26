const Backbone = require("backbone")

module.exports = Backbone.Collection.extend({
  model: require("../models/player"),

  url: function () {
    return `/rooms/${this.room_name}/players`
  },

  initialize: function ({room_name}) {
    this.room_name = room_name
  }
})
