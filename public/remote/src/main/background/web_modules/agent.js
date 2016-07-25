var Handler = require('handler')
var commands = require('commands')

function Agent(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(true, defaultConfig, config)

  this.handler = new Handler(chross, {
    crossIframeURL: chross.config.crossIframeURL
  })

  this.commands = commands || {}

  this.chross = chross

  this.init()
}

$.extend(Agent.prototype, {
  findAction: function (command) {
    var self = this

    return self.commands[command]
  },

  init: function () {
  }
})

module.exports = Agent