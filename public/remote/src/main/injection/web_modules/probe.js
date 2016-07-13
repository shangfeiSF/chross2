function Probe(chross) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(defaultConfig, config)

  this.runCodeListeners = {}

  this.chross = chross
  
  this.init()
}

$.extend(Probe.prototype, {
  generateUuid: function () {
    return [+new Date(), '_', Math.floor(Math.random() * 3e10)].join('')
  },

  resolveListenerByUuid: function (uuid, data) {
    var self = this

    if (self.runCodeListeners.hasOwnProperty(uuid)) {
      self.runCodeListeners[uuid](data)
    }
    else {
      console.error('Can not resolve the runCodeResult')
    }
  },

  monitorRunCodeResult: function () {
    var self = this

    var topPort = self.chross.port.getTopPort()

    topPort.onMessage.addListener(function (msg) {
      if (msg.uuid === undefined) return false

      self.resolveListenerByUuid(msg.uuid, msg.data)
    })

  },

  runCodeInIframe: function (code, config) {
    var self = this

    var uuid = self.generateUuid()

    var listener = function () {
    }

    if (config) {
      if ($.isFunction(config.listener)) {
        listener = config.listener
      }
      else if ($.isFunction(config)) {
        listener = config
      }
    }

    self.runCodeListeners[uuid] = listener

    self.chross.port.post('runCodeInIframe', {
      uuid: uuid,
      code: code.toString()
    })
  },

  init: function () {
    var self = this

    self.monitorRunCodeResult()
  }
})

module.exports = Probe
