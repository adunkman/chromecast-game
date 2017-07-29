const $ = require("jquery")
const Backbone = require("backbone")

module.exports = Backbone.View.extend({
  className: "player-name-selector",
  template: require("../templates/player_name_selector_template"),

  events: {
    "submit": "save_player_name"
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
      .then((player) => {
        this.collection.add(player)
        this.navigate_to_player_url()
      })
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

  show_error: function () {
    this.$(".js-form-error").text("Something went wrong. Try again?")
  },

  navigate_to_player_url: function () {
    this.router.navigate(`/rooms/${encodeURIComponent(this.room_name)}/players/${this.client_id}`, {
      trigger: true
    })
  }
})
