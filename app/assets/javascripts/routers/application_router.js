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
    "rooms/:room_name/players/:client_id(/)": "waiting_for_game",
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
    this.set_view_and_unsubscribe(new RoomSelectorView({
      router: this,
      client_id: this.client_id
    }))
  },

  room_lobby: function (room_name) {
    const players = new PlayersCollection([], {room_name})
    const games = new GamesCollection([], {room_name})
    var view

    if (this.is_chromecast()) {
      view = new TvRoomView({
        router: this,
        room_name: room_name,
        players: players,
        games: games
      })
    }
    else {
      view = new PlayerNameSelectorView({
        router: this,
        room_name: room_name,
        client_id: this.client_id,
        collection: players
      })
    }

    this.set_view_and_unsubscribe(view)

    this.ws.subscribe(`/rooms/${room_name}`, (message) => {
      switch (message.type) {
        case "players":
          players.set(message.data)
          break
        case "games":
          games.set(message.data)
          break
      }
    }, () => {
      players.fetch()
      games.fetch()
    })
  },

  waiting_for_game: function (room_name, client_id) {
    const players = new PlayersCollection([], {room_name})
    const games = new GamesCollection([], {room_name})

    this.set_view_and_unsubscribe(new WaitingForGameView({
      router: this,
      room_name: room_name,
      client_id: this.client_id,
      players: players,
      games: games,
    }))

    this.ws.subscribe(`/rooms/${room_name}`, (message) => {
      switch (message.type) {
        case "players":
          players.set(message.data)
          break
        case "games":
          games.set(message.data)
          break
      }
    }, () => {
      players.fetch()
      games.fetch()
    })
  },

  game: function (room_name, game_id) {
    const players = new PlayersCollection([], {room_name})
    const games = new GamesCollection([
      {id: game_id, room_name}
    ], {room_name})
    const game = games.models[0]

    if (this.is_chromecast()) {
      this.set_view_and_unsubscribe(new TvGameView({
        room_name: room_name,
        players: players,
        model: game
      }))
    }
    else {
      this.set_view_and_unsubscribe(new GameView({
        model: game,
        client_id: this.client_id,
        players: players,
        router: this.router
      }))
    }

    this.ws.subscribe(`/rooms/${room_name}`, (message) => {
      switch (message.type) {
        case "players":
          players.set(message.data)
          break
        case "games":
          games.set(message.data)
          break
      }
    }, () => {
      players.fetch()
      games.fetch()
    })
  },

  is_chromecast: function () {
    return navigator.userAgent.includes("CrKey")
  },

  set_view_and_unsubscribe: function (view) {
    this.ws.subscriptions().forEach((p) => {
      this.ws.unsubscribe(p, null, () => {})
    })

    if (this.view) {
      this.view.remove()
    }

    view.render()
    $("body").empty().append(view.el)
    this.view = view
  }
})
