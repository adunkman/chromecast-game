const Backbone = require("backbone")

module.exports = Backbone.View.extend({
  template: require("../templates/tv_room_template"),

  initialize: function ({router, room_name, players, games}) {
    this.router = router
    this.room_name = room_name
    this.players = players
    this.games = games

    this.listenTo(this.players, "add change remove", this.render)
  },

  render: function () {
    const players = this.players.toJSON()

    this.$el.html(this.template({
      origin: location.origin,
      room_name: this.room_name.replace(/-/g, " "),
      players: players,
      player_count: players.length
    }))
  }
})
