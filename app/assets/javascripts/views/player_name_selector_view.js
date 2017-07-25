const $ = require("jquery")
const Backbone = require("backbone")

module.exports = Backbone.View.extend({
  template: require("../templates/player_name_selector_template"),
  waiting_template: require("../templates/player_name_selector_waiting_template"),

  events: {
    "submit": "save_player_name",
    "click .js-start-game": "start_game"
  },

  initialize: function ({router, room_name, client_id}) {
    this.router = router
    this.room_name = room_name
    this.client_id = client_id
  },

  render: function () {
    this.$el.html(this.template())
  },

  save_player_name: function (evt) {
    evt.preventDefault()
    this.$(".js-form-error").empty()

    const name = this.$("input").val().trim()

    this.set_player_name(name)
      .then(this.render_waiting_message.bind(this))
      .catch(this.show_error.bind(this))
  },

  set_player_name: function (name) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "patch",
        url: `/players/${encodeURIComponent(this.client_id)}`,
        data: {name},
        dataType: "json",
        success: resolve,
        error: reject
      })
    })
  },

  render_waiting_message: function (player) {
    this.$el.html(this.waiting_template(player))
  },

  show_error: function () {
    this.$(".js-form-error").text("Something went wrong. Try again?")
  },

  start_game: function () {
    this.$(".js-form-error").empty()

    this.create_game_in_room()
      .then(this.navigate_to_game_url.bind(this))
      .catch(this.show_error.bind(this))
  },

  create_game_in_room: function () {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "post",
        url: `/rooms/${encodeURIComponent(this.room_name)}/games`,
        dataType: "json",
        success: resolve,
        error: reject
      })
    })
  },

  navigate_to_game_url: function (game) {
    this.router.navigate(`/rooms/${encodeURIComponent(this.room_name)}/games/${game.id}`, {
      trigger: true
    })
  }
})
