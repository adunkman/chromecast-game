const $ = require("jquery")
const Backbone = require("backbone")

module.exports = Backbone.View.extend({
  className: "game-completed",
  template: require("../templates/game_completed_template"),

  events: {
    "click .js-create-game": "start_game",
    "click .js-create-room": "create_new_room"
  },

  initialize: function ({players, router}) {
    this.players = players
    this.router = router
  },

  render: function () {
    this.$el.html(this.template(this.render_attrs()))
  },

  render_attrs: function () {
    const scores = this.model.score()
    const players_with_scores = this.players.map((p) => {
      return {
        name: p.get("name"),
        score: scores[p.get("client_id")] || 0
      }
    }).sort((a, b) => a.score > b.score ? 1 : -1)

    return {
      players_with_scores: players_with_scores
    }
  },

  show_error: function () {
    this.$(".js-form-error").text("Something went wrong. Try again?")
  },

  start_game: function () {
    this.$(".js-form-error").empty()

    this.create_game_in_room()
      .then(this.navigate_to_game_url.bind(this))
      .catch(this.show_error.bind(this))
  },

  create_game_in_room: function () {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "post",
        url: `/rooms/${encodeURIComponent(this.model.get("room_name"))}/games`,
        dataType: "json",
        success: resolve,
        error: reject
      })
    })
  },

  navigate_to_game_url: function (game) {
    this.router.navigate(`/rooms/${encodeURIComponent(this.model.get("room_name"))}/games/${game.id}`, {
      trigger: true
    })
  },

  create_new_room: function () {

  }
})
