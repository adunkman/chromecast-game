const ReconnectingWebsocket = require("reconnectingwebsocket")
const Backbone = require("backbone")
const _ = require("underscore")

module.exports = class Websocket {
  constructor(endpoint) {
    _.extend(this, Backbone.Events)

    const ws = new ReconnectingWebsocket(endpoint)

    ws.addEventListener("open", () => this.trigger("open"))
    ws.addEventListener("close", () => this.trigger("close"))
    ws.addEventListener("message", ({data}) => {
      const message = JSON.parse(data)
      this.trigger(`message:${message.type}`, message.data)
    })
  }
}
