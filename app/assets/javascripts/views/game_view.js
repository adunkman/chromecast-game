const Backbone = require("backbone")

const GameLoadingView = require("./game_loading_view")
const GameQuestionView = require("./game_question_view")
const GameAnswersView = require("./game_answers_view")
const GameScoreView = require("./game_score_view")
const GameCompletedView = require("./game_completed_view")

module.exports = Backbone.View.extend({
  initialize: function ({players, router}) {
    this.players = players
    this.router = router

    this.listenTo(this.model, "change:state", this.render)
  },

  render: function () {
    const state = this.model.state() || "loading"
    const view = this[`create_${state}_view`]()

    if (this.view) {
      this.view.remove()
    }
    view.render()
    this.$el.html(view.el)
    this.view = view
  },

  create_loading_view: function () {
    return new GameLoadingView({model: this.model})
  },

  create_show_question_view: function () {
    return new GameQuestionView({model: this.model})
  },

  create_show_answers_view: function () {
    return new GameAnswersView({model: this.model})
  },

  create_show_score_view: function () {
    return new GameScoreView()
  },

  create_completed_view: function () {
    return new GameCompletedView({model: this.model, players: this.players, router: this.router})
  }
})
