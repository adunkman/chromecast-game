const $ = require("jquery")
const Backbone = require("backbone")

const RoomSelectorView = require("../views/room_selector_view")
const PlayerNameSelectorView = require("../views/player_name_selector_view")
const GameView = require("../views/game_view")
const TvRoomView = require("../views/tv_room_view")

module.exports = Backbone.Router.extend({
  routes: {
    "(/)": "lobby",
    "rooms/:room_name(/)": "room_lobby",
    "rooms/:room_name/games/:game_id(/)": "game"
  },

  initialize: function ({ws, client_id}) {
    this.ws = ws
    this.client_id = client_id

    this.initialize_cast_api()
  },

  initialize_cast_api: function () {
    if (this.is_chromecast()) {
      cast.receiver.logger.setLevelValue(cast.receiver.LoggerLevel.DEBUG)
      this.cast_receiver_manager = cast.receiver.CastReceiverManager.getInstance()
      this.cast_receiver_manager.start()
    }
    else {
      window.__onGCastApiAvailable = (is_available) => {
        this.cast_context = cast.framework.CastContext.getInstance()
        this.cast_context.setOptions({
          receiverApplicationId: "596B5B39",
          autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
        })
      }
    }
  },

  lobby: function () {
    this.set_view(new RoomSelectorView({
      router: this,
      client_id: this.client_id
    }))
  },

  room_lobby: function (room_name) {
    if (this.is_chromecast()) {
      this.set_view(new TvRoomView({
        router: this,
        room_name: room_name
      }))
    }
    else {
      this.set_view(new PlayerNameSelectorView({
        router: this,
        room_name: room_name,
        client_id: this.client_id
      }))
    }
  },

  game: function (room_name, game_id) {
    this.set_view(new GameView({
      router: this,
      room_name: room_name,
      client_id: this.client_id
    }))
  },

  is_chromecast: function () {
    return navigator.userAgent.includes("CrKey")
  },

  set_view: function (view) {
    view.render()
    $("body").empty().append(view.el)
  }
})
