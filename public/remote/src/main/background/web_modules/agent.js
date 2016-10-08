var Handler = require('handler')
var commands = require('commands')

// Agent向injection.chross提供命令，驱动background.chross
// Agent顾名思义，作为background的代理接收commands
function Agent(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(true, {}, defaultConfig, config)

  // handler 中包含全部命令对应的实体方法
  this.handler = new Handler(chross, {
    crossIframeURL: chross.config.crossIframeURL
  })

  this.commands = commands || {}

  this.chross = chross

  this.init()
}

$.extend(Agent.prototype, {
  findAction: function (command) {
    return this.commands[command]
  },

  init: function () {
  }
})

module.exports = Agent