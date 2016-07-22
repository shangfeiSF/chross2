module.exports = {
  actions: {
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

      var tabId = sender.tab.id

      chrome.tabs.executeScript(tabId, {
        code: self._assembleCode(data),
        allFrames: true,
        matchAboutBlank: true
      }, function () {
        defer.resolve({
          type: 'private',
          content: 'executeScript in all frames of  ' + tabId,
        })
      })

      return promise
    },

    urlChange: function (data, sender) {
      var self = this

      var defer = $.Deferred()
      var promise = defer.promise()

      self.chross.cache.createViewStore(sender.tab, true)

      defer.resolve({
        type: 'private',
        content: 'created a new viewStore belongs to the tab with tabId=' + sender.tab.id,
        url: data.url,
        sign: data.sign,
        timeStamp: data.timeStamp,
      })

      return promise
    }
  },

  helpers: {
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
}