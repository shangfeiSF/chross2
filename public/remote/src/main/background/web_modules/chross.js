var Port = require('port')
var Cache = require('cache')
var Agent = require('agent')
var Network = require('network')
var Navigation = require('navigation')

function Chross(config) {
  var config = config || {}

  this.defaultConfig = {}

  this.config = $.extend(this.defaultConfig, config)

  this.userContent = "console.info(window.document.body)"
}

$.extend(Chross.prototype, {
  boot: function () {
    var self = this

    self.network = new Network(this)

    self.navigation = new Navigation(this)

    self.cache = new Cache(this)

    self.agent = new Agent(this)

    self.port = new Port(this)
  },

  init: function () {
    var self = this

    self.boot()
  }
})

module.exports = Chross