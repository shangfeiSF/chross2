var Handler = require('handler')

function Agent(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(defaultConfig, config)

  this.handler = new Handler(chross, {
    crossIframeURL: chross.config.crossIframeURL
  })

  this.commands = {}

  this.chross = chross

  this.init(config.commands)
}

$.extend(Agent.prototype, {
  findAction: function (commands) {
    var self = this

    return self.commands[commands]
  },

  init: function (commands) {
    var self = this

    var actions = self.handler.actionsMap

    self.commands = $.extend(actions, commands || {})
  }
})

module.exports = Agent