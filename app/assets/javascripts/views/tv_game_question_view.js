const Backbone = require("backbone")

module.exports = Backbone.View.extend({
  template: require("../templates/tv_game_question_template"),
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
      prompt_html: question.prompt.replace("_", "<span class=\"blank\"></span>"),
      countdown: this.countdown,
      s: this.countdown === 1 ? "" : "s"
    }
  },

  count_down: function () {
    this.countdown--

    if (this.countdown < 0) {
      clearInterval(this.interval)
      this.model.save({state: `show_answers:${this.model.state_param()}`})
    }
    else {
      this.render()
    }
  }
})
