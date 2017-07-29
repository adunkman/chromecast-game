const Backbone = require("backbone")

module.exports = Backbone.Model.extend({
  url: function () {
    return `/rooms/${this.room_name}/games/${this.id}`
  },

  initialize: function ({room_name}) {
    this.room_name = room_name
  },

  is_loaded: function () {
    return !!this.get("questions")
  },

  is_unfinished: function () {
    return this.get("state") !== "completed"
  },

  state: function () {
    const s = this.get("state")
    return s ? s.split(":")[0] : s
  },

  state_param: function () {
    const s = this.get("state")
    return s ? s.split(":")[1] : s
  },

  score: function () {
    const scores = {}

    this.get("questions").forEach((q) => {
      q.choices.forEach((c) => {
        var client_id_to_increment
        if (c.is_correct) {
          client_id_to_increment = c.client_id
        }
        else {
          client_id_to_increment = c.chosen_client_id
        }

        scores[client_id_to_increment] = scores[client_id_to_increment] || 0
        scores[client_id_to_increment]++
      })
    })

    return scores
  }
})
