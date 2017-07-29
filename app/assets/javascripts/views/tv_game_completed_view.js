const Backbone = require("backbone")

module.exports = Backbone.View.extend({
  template: require("../templates/tv_game_completed_template"),

  initialize: function ({players}) {
    this.players = players
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
  }
})
