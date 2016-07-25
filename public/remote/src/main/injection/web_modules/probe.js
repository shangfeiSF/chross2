var message = require('message')

function Probe(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(true, defaultConfig, config)

  this.listenerInfosMap = {}

  this.chross = chross

  this.init()
}

$.extend(Probe.prototype,
  {
    runCodeInIframe: function (code, config) {
      var self = this
      var port = self.chross.port

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

      self.register(listener)
        .then(function (sign) {
          port.post({
            sign: sign,
            command: 'runCodeInIframe',
            params: {
              sign: sign,
              code: code.toString()
            }
          })
        })
    }
  },
  {
    resolve: function (msg) {
      var self = this
      var uuid = msg.sign.uuid

      if (self.listenerInfosMap.hasOwnProperty(uuid)) {
        self.listenerInfosMap[uuid](msg)
      } else {
        console.error('Can not resolve!')
      }
    },

    register: function (listener) {
      var self = this
      var uuid = message.generateUuid()

      var defer = $.Deferred()
      var promise = defer.promise()

      self.listenerInfosMap[uuid] = listener

      defer.resolve({
        module: self.constructor.name,
        uuid: uuid
      })

      return promise
    },

    init: function () {
    }
  })

module.exports = Probe
