const Nes = require("nes/client")
const Backbone = require("backbone")
const _ = require("underscore")

module.exports = class Websocket extends Nes.Client {
  constructor(endpoint) {
    super(endpoint)
    this.connect((err) => {})
  }
}
