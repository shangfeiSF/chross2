var message = require('message')

function Navigation(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(true, {}, defaultConfig, config)

  this.listenerInfosMap = {}

  this.chross = chross

  this.init()
}

$.extend(Navigation.prototype,
  // chross.navigation提供的API
  {
    urlChange: function (url) {
      var self = this
      var port = self.chross.port

      // 一次urlChange一次回调，故使用promise实现回调
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
  }
)

module.exports = Navigation
