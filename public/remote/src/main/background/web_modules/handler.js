var handlerCore = require('handlerCore')

function Handler(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(defaultConfig, config)

  this.actionsMap = {}

  this.chross = chross

  this.init()
}

$.extend(Handler.prototype,
  handlerCore.actions,
  handlerCore.helpers,
  {
    registerActions: function () {
      var self = this

      Object.keys(handlerCore.actions).forEach(function (action) {
        self.actionsMap[action] = action
      })
    },

    init: function () {
      var self = this

      self.registerActions()
    }
  }
)

module.exports = Handler