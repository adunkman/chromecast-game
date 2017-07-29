const $ = require("jquery")
const md5 = require("md5")
const Backbone = require("backbone")

module.exports = Backbone.View.extend({
  className: "game-answers",
  template: require("../templates/game_answers_template"),
  submitted: false,
  emoji: ["😬", "👀", "👻", "🐛", "🐶", "🌏"],

  events: {
    "click .js-answer": "submit_response"
  },

  initialize: function ({client_id}) {
    this.client_id = client_id
  },

  render: function () {
    this.$el.html(this.template(this.render_attrs()))
  },

  render_attrs: function () {
    const question_index = this.model.state_param()
    const question = this.model.get("questions")[question_index]
    const other_answers = question.answers.filter((a) => a.client_id !== this.client_id)
    const answers = [{
      answer: question.answer,
      correct: true
    }].concat(other_answers)

    return {
      prompt_html: question.prompt.replace("_", "<span class=\"blank\"></span>"),
      answers: answers.sort((a, b) => md5(a.answer) < md5(b.answer) ? 1 : -1),
      submitted: this.submitted,
      random_emoji: this.emoji[Math.floor(Math.random() * this.emoji.length)]
    }
  },

  submit_response: function (evt) {
    const question_index = this.model.state_param()
    const question = this.model.get("questions")[question_index]
    const answer_id = $(evt.currentTarget).data("answer-id")

    $.ajax({
      type: "post",
      url: `/games/${encodeURIComponent(this.model.id)}/questions/${encodeURIComponent(question.id)}/choices`,
      data: { client_id: this.client_id, answer_id: answer_id },
      dataType: "json",
      success: this.answer_submitted.bind(this),
      error: this.show_error.bind(this)
    })
  },

  show_error: function () {
    this.$(".js-form-error").text("Something went wrong. Try again?")
  },

  answer_submitted: function () {
    this.submitted = true
    this.render()
  }
})
