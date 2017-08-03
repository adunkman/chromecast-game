const _ = require("underscore")
const md5 = require("md5")
const Backbone = require("backbone")

module.exports = Backbone.View.extend({
  template: require("../templates/tv_game_answers_template"),
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
    const answers = [question.answer].concat(_.pluck(question.answers, "answer"))

    return {
      prompt_html: question.prompt.replace("_", "<span class=\"blank\"></span>"),
      answers: answers.sort((a, b) => md5(a) < md5(b) ? 1 : -1),
      countdown: this.countdown,
      s: this.countdown === 1 ? "" : "s"
    }
  },

  count_down: function () {
    this.countdown--

    if (this.countdown < 0) {
      clearInterval(this.interval)
      this.model.save({state: `show_score:${this.model.state_param()}`})
    }
    else {
      this.render()
    }
  },

  remove: function () {
    clearInterval(this.interval)
    Backbone.View.prototype.remove.apply(this, arguments)
  }
})
