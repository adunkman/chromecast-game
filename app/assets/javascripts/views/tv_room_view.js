const Backbone = require("backbone")

module.exports = Backbone.View.extend({
  template: require("../templates/tv_room_template"),

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

    this.$el.html(this.template({
      origin: location.origin,
      room_name: this.room_name.replace(/-/g, " "),
      players: players,
      player_count: players.length
    }))
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
