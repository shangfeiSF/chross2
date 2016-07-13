function Handler(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(defaultConfig, config)

  this.actionsMap = {}

  this.chross = chross

  this.init()
}

// chross提供的核心API
var actions = {
  identity: function (msg, sender) {
  },

  ajax: function (msg, sender) {
  },

  ping: function (msg, sender) {
  },

  finish: function (msg, sender) {
  },

  runCodeInIframe: function (data, sender) {
    var self = this

    var defer = $.Deferred()
    var promise = defer.promise()

    chrome.tabs.executeScript(sender.tab.id, {
      code: self._assembleCode(data),
      allFrames: true,
      matchAboutBlank: true
    }, function () {
      defer.resolve()
    })

    return promise
  }
}

// 标准API的辅助方法
var helpers = {
  _assembleCode: function (data) {
    var self = this

    var code =
      'var result = (' + data.code + ')();' +
      'result = result || {};' +
      'if (typeof result != "object") { result = {value: result}; }' +
      'result.uuid="' + data.uuid + '"; ' +
      'new Image().src= "' + self.chross.config.crossIframeURL + '?_=" + (+new Date()) + ' +
      '"&__r_e_s_u_l_t__=" + JSON.stringify(result);';

    return code
  },

  _noop: function () {
    var defer = $.Deferred()
    var promise = defer.promise()

    defer.resolve()

    return promise
  }
}

$.extend(Handler.prototype, actions, helpers, {
  registerActions: function () {
    var self = this

    Object.keys(actions).forEach(function (action) {
      self.actionsMap[action] = action
    })
  },

  init: function () {
    var self = this

    self.registerActions()
  }
})

module.exports = Handler