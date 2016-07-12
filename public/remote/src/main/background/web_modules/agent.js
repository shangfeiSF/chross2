var Handler = require('handler')
var Probe = require('probe')

function Agent(chross, config) {
  var config = config || {}

  this.defaultConfig = {
    actionAliases: {
      identity: 'identity',
      ajax: 'ajax',
      ping: 'ping',
      finish: 'finish',
      runCodeInIframe: 'runCodeInIframe'
    },

    crossIframeURL: '//gtms04.alicdn.com/tps/i4/TB1vX.wKVXXXXX7XXXX_RF9JFXX-1-1.gif'
  }

  this.config = $.extend(this.defaultConfig, config)

  this.probe = new Probe(chross, {
    crossIframeURL: this.config.crossIframeURL
  })

  this.handler = new Handler({
    crossIframeURL: this.config.crossIframeURL
  })

  this.actions = {}

  this.chross = chross

  this.init()
}

$.extend(Agent.prototype, {
  register: function (alias, handler) {
    var self = this

    self.actions[alias] = handler
  },

  getHandler: function (alias) {
    var self = this

    var result = self.handler.noop

    var handler = self.actions[alias]

    if (handler && (typeof handler).toLowerCase() === 'function') {
      result = handler
    }

    return result
  },

  init: function () {
    var self = this

    var aliases = self.config.actionAliases

    Object.keys(aliases).forEach(function (alias) {
      self.register(alias, self.handler[aliases[alias]])
    })
  }
})

module.exports = Agent