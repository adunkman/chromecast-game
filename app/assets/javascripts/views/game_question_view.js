const $ = require("jquery")
const Backbone = require("backbone")

module.exports = Backbone.View.extend({
  template: require("../templates/game_question_template"),
  submitted: false,

  events: {
    "submit": "submit_answer"
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

    return {
      prompt_html: question.prompt.replace("_", "<span class=\"blank\"></span>"),
      submitted: this.submitted
    }
  },

  submit_answer: function (evt) {
    evt.preventDefault()

    const question_index = this.model.state_param()
    const question = this.model.get("questions")[question_index]
    const answer = this.$("input").val().trim()

    $.ajax({
      type: "post",
      url: `/games/${encodeURIComponent(this.model.id)}/questions/${encodeURIComponent(question.id)}/answers`,
      data: { client_id: this.client_id, answer: answer },
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
