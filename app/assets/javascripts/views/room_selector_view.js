const $ = require("jquery")
const Backbone = require("backbone")

module.exports = Backbone.View.extend({
  className: "room-selector",
  template: require("../templates/room_selector_template"),

  events: {
    "submit": "join_if_room_exists",
    "keyup input": "clear_validation_error_if_value_changed"
  },

  initialize: function ({router}) {
    this.router = router
  },

  render: function () {
    this.$el.html(this.template())
  },

  join_if_room_exists: function (evt) {
    evt.preventDefault()
    this.$(".js-form-error").empty()

    const room_name = this.$("input").val().toLowerCase().trim().replace(/\s/g, "-")

    this.join_room(room_name)
      .then(this.navigate_to_room_url.bind(this))
      .catch(this.show_error.bind(this))
  },

  join_room: function (room_name) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "put",
        url: `/rooms/${encodeURIComponent(room_name)}/players`,
        dataType: "json",
        success: () => resolve(room_name),
        error: reject
      })
    })
  },

  navigate_to_room_url: function (room_name) {
    this.router.navigate(`/rooms/${encodeURIComponent(room_name)}`, {
      trigger: true
    })
  },

  show_error: function (xhr) {
    if (xhr && xhr.status === 404) {
      this.show_input_error("This room doesn’t exist. Double-check your spelling?")
    }
    else {
      this.$(".js-form-error").text("Something went wrong. Try again?")
    }
  },

  show_input_error: function (message) {
    const input = this.$("input")[0]
    input.dataset.validated_input = input.value
    input.setCustomValidity(message)
    this.$el.find(":submit").click()
  },

  clear_validation_error_if_value_changed: function () {
    const input = this.$("input")[0]

    if (input.dataset.validated_input !== input.value) {
      input.setCustomValidity("")
    }
  }
})
