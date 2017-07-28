const Backbone = require("backbone")

module.exports = Backbone.View.extend({
  views: {
    look_up: () => new GameLoadingView()
  },

  initialize: function ({router, room_name, players, games}) {
    this.router = router
    this.room_name = room_name
    this.players = players
    this.games = games
  },

  render: function () {
    const state = (this.model ? this.model.get("state") : null) || "look_up"
    const view = this.views[state]()

    view.render()
    this.$el.html(view.el)
  }
})
