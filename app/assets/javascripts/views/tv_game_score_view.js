const Backbone = require("backbone")

module.exports = Backbone.View.extend({
  template: require("../templates/tv_game_score_template"),
  countdown: 15,

  initialize: function () {
    this.interval = setInterval(this.count_down.bind(this), 1000)
  },

  render: function () {
    this.$el.html(this.template(this.render_attrs()))
  },

  render_attrs: function () {
    const question_index = this.model.state_param()
    const question = this.model.get("questions")[question_index]

    return {
      prompt_html: question.prompt.replace("_", `<strong>${question.answer}</strong>`),
      explanation: question.explanation,
      countdown: this.countdown,
      s: this.countdown === 1 ? "" : "s",
      has_next_question: +this.model.state_param() < 9
    }
  },

  count_down: function () {
    this.countdown--

    if (this.countdown < 0) {
      clearInterval(this.interval)
      const index = +this.model.state_param()

      if (index < 9) {
        this.model.save({state: `show_question:${index + 1}`})
      }
      else {
        this.model.save({state: "completed"})
      }
    }
    else {
      this.render()
    }
  }
})
