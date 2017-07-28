const Backbone = require("backbone")

const TvGameLoadingView = require("./tv_game_loading_view")
const TvGameQuestionView = require("./tv_game_question_view")
const TvGameAnswersView = require("./tv_game_answers_view")
const TvGameScoreView = require("./tv_game_score_view")
const TvGameCompletedView = require("./tv_game_completed_view")

module.exports = Backbone.View.extend({
  initialize: function ({router, room_name, players}) {
    this.router = router
    this.room_name = room_name
    this.players = players

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
    return new TvGameLoadingView({model: this.model})
  },

  create_show_question_view: function () {
    return new TvGameQuestionView({model: this.model})
  },

  create_show_answers_view: function () {
    return new TvGameAnswersView({model: this.model})
  },

  create_show_score_view: function () {
    return new TvGameScoreView({model: this.model})
  },

  create_completed_view: function () {
    return new TvGameCompletedView({model: this.model})
  }
})
