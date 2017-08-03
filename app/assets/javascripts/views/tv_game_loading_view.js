const Backbone = require("backbone")

module.exports = Backbone.View.extend({
  template: require("../templates/tv_game_loading_template"),
  countdown: 10,
  is_counting_down: false,

  initialize: function () {
    this.listenTo(this.model, "change", this.start_countdown_if_loaded)
  },

  start_countdown_if_loaded: function () {
    if (this.model.is_loaded() && !this.is_counting_down) {
      this.is_counting_down = true
      this.interval = setInterval(this.count_down.bind(this), 1000)
      this.render()
    }
  },

  render: function () {
    this.start_countdown_if_loaded()
    this.$el.html(this.template(this.render_attrs()))
  },

  render_attrs: function () {
    if (this.is_counting_down) {
      return {
        starting: true,
        countdown: this.countdown,
        s: this.countdown === 1 ? "" : "s"
      }
    }
    else {
      return {}
    }
  },

  count_down: function () {
    this.countdown--

    if (this.countdown < 0) {
      clearInterval(this.interval)
      this.model.save({state: "show_question:0"})
    }
    else {
      this.render()
    }
  },

  stopListening: function () {
    clearInterval(this.interval)
    Backbone.View.prototype.stopListening.apply(this, arguments)
  }
})
