var message = require('message')

function Navigation(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(true, defaultConfig, config)

  this.listenerInfosMap = {}
  
  this.chross = chross
  
  this.init()
}

$.extend(Navigation.prototype,
  {
    urlChange: function (url) {
      var self = this
      var port = self.chross.port

      var listener = $.Deferred()

      self.register(listener)
        .then(function (sign) {
          port.post({
            sign: sign,
            command: 'urlChange',
            params: {
              url: url
            }
          })
        })

      return listener.promise()
    }
  },
  {
    resolve: function (msg) {
      var self = this
      var uuid = msg.sign.uuid

      if (self.listenerInfosMap.hasOwnProperty(uuid)) {
        self.listenerInfosMap[uuid].resolve(msg)
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

module.exports = Navigation
