const $ = require("jquery")
const Backbone = require("backbone")

module.exports = Backbone.View.extend({
  className: "waiting-for-game",
  template: require("../templates/waiting_for_game_template"),

  events: {
    "click .js-start-game": "start_game"
  },

  initialize: function ({router, room_name, players, games}) {
    this.router = router
    this.room_name = room_name
    this.players = players
    this.games = games

    this.listenTo(this.players, "add change remove", this.render)
    this.listenTo(this.games, "add", this.navigate_to_game_url_if_unfinished)
  },

  render: function () {
    const players = this.players.toJSON()
    const client_id = $("body").data("client_id")

    players.forEach((p) => {
      p.is_you = p.client_id === this.client_id
    })

    this.$el.html(this.template({ players }))
  },

  show_error: function () {
    this.$(".js-form-error").text("Something went wrong. Try again?")
  },

  start_game: function () {
    this.$(".js-form-error").empty()
    this.create_game_in_room()
  },

  create_game_in_room: function () {
    $.ajax({
      type: "post",
      url: `/rooms/${encodeURIComponent(this.room_name)}/games`,
      dataType: "json",
      success: (data) => this.navigate_to_game_url(data),
      error: (xhr) => this.show_error(xhr)
    })
  },

  navigate_to_game_url: function (game) {
    this.router.navigate(`/rooms/${encodeURIComponent(this.room_name)}/games/${game.id}`, {
      trigger: true
    })
  },

  navigate_to_game_url_if_unfinished: function (game) {
    const in_progress = this.games.unfinished()
    if (in_progress.length) {
      this.navigate_to_game_url(in_progress[0])
    }
  }
})
