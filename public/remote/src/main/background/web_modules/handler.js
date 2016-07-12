function Handler(config) {
  this.config = config
}

$.extend(Handler.prototype, {
  identity: function (msg, sender) {
  },

  ajax: function (msg, sender) {
  },

  ping: function (msg, sender) {
  },

  finish: function (msg, sender) {
  },

  runCodeInIframe: function (msg, sender) {
    var self = this

    var defer = $.Deferred()
    var promise = defer.promise()

    chrome.tabs.executeScript(sender.tab.id, {
      code: self._assembleCode(msg),
      allFrames: true,
      matchAboutBlank: true
    }, function () {
      defer.resolve()
    })

    return promise
  },

  _assembleCode: function (msg) {
    var self = this

    var code =
      'var result = (' + msg.code + ')();' +
      'result = result || {};' +
      'if (typeof result != "object") { result = {value: result}; }' +
      'result.uuid="' + msg.uuid + '"; ' +
      'new Image().src= "' + self.crossIframeURL + '?_=" + (+new Date()) + ' +
      '"&__r_e_s_u_l_t__=" + JSON.stringify(result);';

    return code
  },

  noop: function (msg, sender) {
  }
})

module.exports = Handler