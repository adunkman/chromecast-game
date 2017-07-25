const $ = require("jquery")
const Backbone = require("backbone")

const ClientId = require("./lib/client_id")
const Websocket = require("./lib/websocket")
const ApplicationRouter = require("./routers/application_router")

$(document).ready(() => {
  const ws = new Websocket($("body").data("websocket-url"))
  const client_id = new ClientId()
  const router = new ApplicationRouter({ws, client_id: client_id.id})

  Backbone.history.start({pushState: true})
})
