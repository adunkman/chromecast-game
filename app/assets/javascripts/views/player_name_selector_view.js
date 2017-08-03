const $ = require("jquery")
const Backbone = require("backbone")

module.exports = Backbone.View.extend({
  className: "player-name-selector",
  template: require("../templates/player_name_selector_template"),

  events: {
    "submit": "save_player_name"
  },

  initialize: function ({router, room_name}) {
    this.router = router
    this.room_name = room_name
  },

  render: function () {
    this.$el.html(this.template())
  },

  save_player_name: function (evt) {
    evt.preventDefault()
    this.$(".js-form-error").empty()

    const name = this.$("input").val().trim()

    this.set_player_name(name)
  },

  set_player_name: function (name) {
    $.ajax({
      type: "patch",
      url: `/players/me`,
      data: {name},
      dataType: "json",
      success: (player) => {
        this.collection.add(player)
        this.navigate_to_player_url()
      },
      error: (xhr) => this.show_error(xhr)
    })
  },

  show_error: function () {
    this.$(".js-form-error").text("Something went wrong. Try again?")
  },

  navigate_to_player_url: function () {
    this.router.navigate(`/rooms/${encodeURIComponent(this.room_name)}/players/me`, {
      trigger: true
    })
  }
})
