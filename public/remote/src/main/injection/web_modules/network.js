var message = require('message')
var momentsConfig = require('momentsConfig')

function Network(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(true, defaultConfig, config)

  this.listenerInfosMap = {}

  this.chross = chross

  this.init()
}

$.extend(Network.prototype,
  momentsConfig,
  {
    existsInAllViews: function (moments) {
      var self = this
      var port = self.chross.port

      var listener = $.Deferred()

      self.register(listener)
        .then(function (sign) {
          port.post({
            sign: sign,
            command: 'existsAVN',
            params: {
              moments: moments
            }
          })
        })

      return listener.promise()
    },

    existsInCurrentView: function (moments) {
      var self = this
      var port = self.chross.port

      var listener = $.Deferred()

      self.register(listener)
        .then(function (sign) {
          port.post({
            sign: sign,
            command: 'existsCVN',
            params: {
              moments: moments
            }
          })
        })

      return listener.promise()
    },

    existsInSpecificView: function (moments, index) {
      var self = this
      var port = self.chross.port

      var listener = $.Deferred()

      self.register(listener)
        .then(function (sign) {
          port.post({
            sign: sign,
            command: 'existsSVN',
            params: {
              moments: moments,
              index: index
            }
          })
        })

      return listener.promise()
    }
  },
  {
    getInAllViews: function (moments) {
      var self = this
      var port = self.chross.port

      var listener = $.Deferred()

      self.register(listener)
        .then(function (sign) {
          port.post({
            sign: sign,
            command: 'getAVN',
            params: {
              moments: moments
            }
          })
        })

      return listener.promise()
    },

    getInCurrentView: function (moments) {
      var self = this
      var port = self.chross.port

      var listener = $.Deferred()

      self.register(listener)
        .then(function (sign) {
          port.post({
            sign: sign,
            command: 'getCVN',
            params: {
              moments: moments
            }
          })
        })

      return listener.promise()
    },

    getInSpecificView: function (moments, index) {
      var self = this
      var port = self.chross.port

      var listener = $.Deferred()

      self.register(listener)
        .then(function (sign) {
          port.post({
            sign: sign,
            command: 'getSVN',
            params: {
              moments: moments,
              index: index
            }
          })
        })

      return listener.promise()
    }
  },
  {
    filterInAllViews: function (moments, pattern) {
      var self = this
      var port = self.chross.port

      var listener = $.Deferred()

      self.register(listener)
        .then(function (sign) {
          port.post({
            sign: sign,
            command: 'filterAVN',
            params: {
              moments: moments,
              pattern: pattern
            }
          })
        })

      return listener.promise()
    },

    filterInCurrentView: function (moments, pattern) {
      var self = this
      var port = self.chross.port

      var listener = $.Deferred()

      self.register(listener)
        .then(function (sign) {
          port.post({
            sign: sign,
            command: 'filterCVN',
            params: {
              moments: moments,
              pattern: pattern
            }
          })
        })

      return listener.promise()
    },

    filterInSpecificView: function (moments, pattern, index) {
      var self = this
      var port = self.chross.port

      var listener = $.Deferred()

      self.register(listener)
        .then(function (sign) {
          port.post({
            sign: sign,
            command: 'filterSVN',
            params: {
              moments: moments,
              pattern: pattern,
              index: index
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

module.exports = Network
