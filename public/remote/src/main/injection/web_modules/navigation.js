function Navigation(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(defaultConfig, config)

  this.chross = chross

  this.urlChangeDeferInfos = {}

  this.init()
}

$.extend(Navigation.prototype, {
  resolveDefer: function (url, urlChangeOccurAt) {
    var self = this

    var deferInfo = self.urlChangeDeferInfos[urlChangeOccurAt]

    var result = {
      allow: false,
      url: url
    }

    if (deferInfo.url === url) {
      result.allow = true
    }

    deferInfo.defer.resolve(result)
  },

  monitorUrlChange: function () {
    var self = this

    var topPort = self.chross.port.getTopPort()

    topPort.onMessage.addListener(function (msg) {
      if (msg.sign === undefined || msg.timeStamp === undefined) return false

      var urlChangeOccurAt = [msg.sign, msg.timeStamp].join('@')

      self.resolveDefer(msg.url, urlChangeOccurAt)
    })
  },

  urlChange: function (url) {
    var self = this

    var defer = $.Deferred()
    var promise = defer.promise()

    var timeStamp = +new Date()
    var sign = Math.round(Math.random() * 3e10)
    var urlChangeOccurAt = [sign, timeStamp].join('@')

    self.urlChangeDeferInfos[urlChangeOccurAt] = {
      defer: defer,
      url: url
    }

    self.chross.port.post('urlChange', {
      url: url,
      sign: sign,
      timeStamp: timeStamp
    })

    return promise
  },

  init: function () {
    var self = this

    self.monitorUrlChange()
  }
})

module.exports = Navigation
