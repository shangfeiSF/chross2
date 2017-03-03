module.exports = {
  // actions 包括全部实体方法
  // 方法全部返回一个Promise
  // 参数列表params, data, sender，分别传递执行参数, 待存数据, port.sender参数
  actions: {
    identity: function (params, data, sender) {
    },

    ajax: function (params, data, sender) {
    },

    ping: function (params, data, sender) {
    },

    finish: function (params, data, sender) {
    },

    runCodeInIframe: function (params, data, sender) {
      var self = this

      var defer = $.Deferred()
      var promise = defer.promise()

      var tabId = sender.tab.id

      chrome.tabs.executeScript(tabId, {
        code: self._assembleCode(params),
        allFrames: true,
        matchAboutBlank: true
      }, function () {
        defer.resolve()
      })

      return promise
    },

    urlChange: function (params, data, sender) {
      var self = this

      var defer = $.Deferred()
      var promise = defer.promise()

      self.chross.cache.createViewStore(sender.tab, true)

      defer.resolve({
        value: {
          url: params.url
        },
        status: 'success'
      })

      return promise
    },

    existsInAllViewsNetwork: function (params, data, sender) {
      var self = this

      var defer = $.Deferred()
      var promise = defer.promise()

      defer.resolve({
        value: self.chross.network.existsInAllBVS(params.moments, sender.tab.id),
        status: 'success'
      })

      return promise
    },

    existsInCurrentViewNetwork: function (params, data, sender) {
      var self = this

      var defer = $.Deferred()
      var promise = defer.promise()

      defer.resolve({
        value: self.chross.network.existsInCurrentBVS(params.moments, sender.tab.id),
        status: 'success'
      })

      return promise
    },

    existsInSpecificViewNetwork: function (params, data, sender) {
      var self = this

      var defer = $.Deferred()
      var promise = defer.promise()

      defer.resolve({
        value: self.chross.network.existsInSpecificBVS(params.moments, params.index, sender.tab.id),
        status: 'success'
      })

      return promise
    },

    getInAllViewsNetwork: function (params, data, sender) {
      var self = this

      var defer = $.Deferred()
      var promise = defer.promise()

      defer.resolve({
        value: self.chross.network.getInAllBVS(params.moments, sender.tab.id),
        status: 'success'
      })

      return promise
    },

    getInCurrentViewNetwork: function (params, data, sender) {
      var self = this

      var defer = $.Deferred()
      var promise = defer.promise()

      defer.resolve({
        value: self.chross.network.getInCurrentBVS(params.moments, sender.tab.id),
        status: 'success'
      })

      return promise
    },

    getInSpecificViewNetwork: function (params, data, sender) {
      var self = this

      var defer = $.Deferred()
      var promise = defer.promise()

      defer.resolve({
        value: self.chross.network.getInSpecificBVS(params.moments, params.index, sender.tab.id),
        status: 'success'
      })

      return promise
    },

    filterInAllViewsNetwork: function (params, data, sender) {
      var self = this

      var defer = $.Deferred()
      var promise = defer.promise()

      defer.resolve({
        value: self.chross.network.filterInAllBVS(params.moments, params.pattern, sender.tab.id),
        status: 'success'
      })

      return promise
    },

    filterInCurrentViewNetwork: function (params, data, sender) {
      var self = this

      var defer = $.Deferred()
      var promise = defer.promise()

      defer.resolve({
        value: self.chross.network.filterInCurrentBVS(params.moments, params.pattern, sender.tab.id),
        status: 'success'
      })

      return promise
    },

    filterInSpecificViewNetwork: function (params, data, sender) {
      var self = this

      var defer = $.Deferred()
      var promise = defer.promise()

      defer.resolve({
        value: self.chross.network.filterInSpecificBVS(params.moments, params.pattern, params.index, sender.tab.id),
        status: 'success'
      })

      return promise
    }
  },

  // helpers 包括全部实体方法的辅助方法
  helpers: {
    // 拼接代码
    _assembleCode: function (params) {
      var self = this

      var code =
        'var value = (' + params.code + ')();' +
        'var result = {};' +
        'result.value = value;' +
        'result.sign=' + JSON.stringify(params.sign) + ';' +
        'new Image().src="' + self.chross.config.crossIframeURL + '?_=" + (+new Date()) +' +
        '"&__r_e_s_u_l_t__=" + JSON.stringify(result);'

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