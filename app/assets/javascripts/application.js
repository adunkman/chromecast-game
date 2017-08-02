const $ = require("jquery")
const Backbone = require("backbone")

const Websocket = require("./lib/websocket")
const ApplicationRouter = require("./routers/application_router")

$(document).ready(() => {
  const ws = new Websocket($("body").data("websocket-url"))
  const router = new ApplicationRouter({ws})

  Backbone.history.start({pushState: true})
})
