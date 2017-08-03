const $ = require("jquery")
const Backbone = require("backbone")

const PlayersCollection = require("../collections/players_collection")
const GamesCollection = require("../collections/games_collection")
const GameModel = require("../models/game_model")

const RoomSelectorView = require("../views/room_selector_view")
const PlayerNameSelectorView = require("../views/player_name_selector_view")
const WaitingForGameView = require("../views/waiting_for_game_view")
const GameView = require("../views/game_view")
const TvRoomView = require("../views/tv_room_view")
const TvGameView = require("../views/tv_game_view")

module.exports = Backbone.Router.extend({
  routes: {
    "(/)": "lobby",
    "rooms/:room_name(/)": "room_lobby",
    "rooms/:room_name/players/me(/)": "waiting_for_game",
    "rooms/:room_name/games/:game_id(/)": "game"
  },

  initialize: function ({ws}) {
    this.ws = ws
    this.players = new PlayersCollection()
    this.games = new GamesCollection()

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
    this.set_view_and_unsubscribe(new RoomSelectorView({
      router: this
    }))
  },

  room_lobby: function (room_name) {
    $("body").append("<div>room_lobby load</div>")
    this.players.room_name = room_name
    this.games.room_name = room_name
    var view

    if (this.is_chromecast()) {
      view = new TvRoomView({
        router: this,
        room_name: room_name,
        players: this.players,
        games: this.games
      })
    }
    else {
      $("body").append("<div>room_lobby creating view</div>")
      view = new PlayerNameSelectorView({
        router: this,
        room_name: room_name,
        collection: this.players
      })
      $("body").append("<div>room_lobby view created</div>")
    }

    this.set_view_and_unsubscribe(view)
    $("body").append("<div>room_lobby view set</div>")

    this.ws.subscribe(`/rooms/${room_name}`, (message) => {
      switch (message.type) {
        case "players":
          this.players.set(message.data)
          break
        case "games":
          this.games.set(message.data)
          break
      }
    }, () => {
      this.players.fetch()
      this.games.fetch()
    })
  },

  waiting_for_game: function (room_name) {
    this.players.room_name = room_name
    this.games.room_name = room_name

    this.set_view_and_unsubscribe(new WaitingForGameView({
      router: this,
      room_name: room_name,
      players: this.players,
      games: this.games,
    }))

    this.ws.subscribe(`/rooms/${room_name}`, (message) => {
      switch (message.type) {
        case "players":
          this.players.set(message.data)
          break
        case "games":
          this.games.set(message.data)
          break
      }
    }, () => {
      this.players.fetch()
      this.games.fetch()
    })
  },

  game: function (room_name, game_id) {
    this.players.room_name = room_name
    this.games.room_name = room_name
    var game

    if (!(game = this.games.findWhere({id: +game_id}))) {
      this.games.add({id: +game_id, room_name})
      game = this.games.findWhere({id: +game_id})
    }

    if (this.is_chromecast()) {
      this.set_view_and_unsubscribe(new TvGameView({
        room_name: room_name,
        players: this.players,
        model: game
      }))
    }
    else {
      this.set_view_and_unsubscribe(new GameView({
        model: game,
        players: this.players,
        router: this.router
      }))
    }

    this.ws.subscribe(`/rooms/${room_name}`, (message) => {
      switch (message.type) {
        case "players":
          this.players.set(message.data)
          break
        case "games":
          this.games.set(message.data)
          break
      }
    }, () => {
      this.players.fetch()
      this.games.fetch()
    })
  },

  is_chromecast: function () {
    return navigator.userAgent.includes("CrKey")
  },

  set_view_and_unsubscribe: function (view) {
    $("body").append("<div>set_view_and_unsubscribe started</div>")
    this.ws.subscriptions().forEach((p) => {
      this.ws.unsubscribe(p, null, () => {})
    })
    $("body").append("<div>set_view_and_unsubscribe unsubscribed</div>")

    if (this.view) {
      $("body").append("<div>set_view_and_unsubscribe view removing</div>")
      this.view.stopListening()
    }

    $("body").append("<div>set_view_and_unsubscribe view rendering</div>")

    view.render()
    $("body").empty().append(view.el)
    this.view = view

    $("body").append("<div>set_view_and_unsubscribe finished</div>")
  }
})
