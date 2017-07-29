const $ = require("jquery")
const Backbone = require("backbone")

module.exports = Backbone.View.extend({
  className: "waiting-for-game",
  template: require("../templates/waiting_for_game_template"),

  events: {
    "click .js-start-game": "start_game"
  },

  initialize: function ({router, room_name, client_id, players, games}) {
    this.router = router
    this.room_name = room_name
    this.client_id = client_id
    this.players = players
    this.games = games

    this.listenTo(this.players, "add change remove", this.render)
    this.listenTo(this.games, "add", this.navigate_to_game_url_if_unfinished)
  },

  render: function () {
    const players = this.players.toJSON()

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
      .then(this.navigate_to_game_url.bind(this))
      .catch(this.show_error.bind(this))
  },

  create_game_in_room: function () {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "post",
        url: `/rooms/${encodeURIComponent(this.room_name)}/games`,
        dataType: "json",
        success: resolve,
        error: reject
      })
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
