var handlerCore = require('handlerCore')

function Handler(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(true, {}, defaultConfig, config)

  this.chross = chross

  this.init()
}

$.extend(Handler.prototype,
  handlerCore.actions,
  handlerCore.helpers,
  {
    init: function () {
    }
  }
)

module.exports = Handler