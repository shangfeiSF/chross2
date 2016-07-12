function Navigation(chross) {
  this.content = {
    // 异步非阻塞的方式注入多个脚本（脚本注入的顺序与数组中声明的顺序无关）
    ayncScripts: [
      {url: 'http://localhost/main/async1.bundle.js'},
      {url: 'http://localhost/main/async2.bundle.js'},
      {url: 'http://localhost/main/async3.bundle.js'},
      {url: 'http://localhost/main/injection.bundle.js'},
    ],
    // 同步阻塞的方式注入多个脚本（脚本注入的顺序与数组中声明的顺序保持一致）
    syncScripts: [
      {url: 'http://localhost/main/sync1.bundle.js'},
      {url: 'http://localhost/main/sync2.bundle.js'},
      {url: 'http://localhost/main/sync3.bundle.js'},
    ],
    // 异步非阻塞的方式注入多个样式表（样式表注入的顺序与数组中声明的顺序无关）
    ayncCss: [],
    // 同步阻塞的方式注入多个样式表（样式表注入的顺序与数组中声明的顺序保持一致）
    syncCss: []
  }

  this.commonConfig = {
    allFrames: false,
    matchAboutBlank: true
  }

  this.chross = chross

  this.init()
}

$.extend(Navigation.prototype, {
  _ajax: function (url, callback) {
    var req = new XMLHttpRequest()

    req.open('GET', url, true)

    req.onload = function () {
      callback(req.responseText)
    }

    req.send(null)
  },

  asyncInject: function (type, tabId) {
    var self = this

    var contents = type ? self.content.ayncScripts : self.content.ayncCss
    var fname = type ? 'executeScript' : 'insertCSS'

    $.each(contents, function (index, content) {
      var info = {
        index: index,
        tabId: tabId,
        url: content.url
      }

      var config = {
        allFrames: content.allFrames !== undefined ? content.allFrames : self.commonConfig.allFrames,
        matchAboutBlank: content.matchAboutBlank !== undefined ? content.matchAboutBlank : self.commonConfig.matchAboutBlank
      }

      self._ajax(info.url, function (code) {
        config.code = code

        chrome.tabs[fname](info.tabId, config, function () {
            var message = ['%c[Injected async ' + type + ']---', content.url].join('')
            console.log(message, 'color: #1dbe1a; font-weight: bold;')
          }
        )
      })
    })
  },

  syncInject: function (type, tabId) {
    var self = this

    var contents = type ? self.content.syncScripts : self.content.syncCss
    var fname = type ? 'executeScript' : 'insertCSS'

    var actions = $.map(contents, function (content, index) {
      var info = {
        index: index,
        tabId: tabId,
        url: content.url
      }

      var config = {
        allFrames: content.allFrames !== undefined ? content.allFrames : self.commonConfig.allFrames,
        matchAboutBlank: content.matchAboutBlank !== undefined ? content.matchAboutBlank : self.commonConfig.matchAboutBlank
      }

      return (function (info, config) {
        var info = info
        var config = config

        return function () {
          self._ajax(info.url, function (code) {
            config.code = code

            chrome.tabs[fname](info.tabId, config, function () {
                var message = ['%c[Injected sync ' + type + ']---', info.url].join('')
                console.log(message, 'color: #2b9dff; font-weight: bold;')

                var next = actions[info.index + 1]
                next !== undefined && next()
              }
            )
          })
        }
      })(info, config)
    })

    actions.length && actions[0]()
  },

  onBeforeNavigate: function () {
    var self = this

    chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
      if (details.frameId !== 0) return false
    })
  },

  onCommitted: function () {
    var self = this

    chrome.webNavigation.onCommitted.addListener(function (details) {
      if (details.frameId !== 0) return false

      self.syncInjectCss(details.tabId)
      self.asyncInjectCss(details.tabId)

      self.syncInjectScripts(details.tabId)
      self.asyncInjectScripts(details.tabId)
    })
  },

  onDOMContentLoaded: function () {
    var self = this

    chrome.webNavigation.onDOMContentLoaded.addListener(function (details) {
      if (details.frameId !== 0) return false

      chrome.tabs.executeScript(details.tabId, {
        code: self.chross.userContent,
        allFrames: true,
        matchAboutBlank: true
      }, function () {
        console.log('Injected user content')
      })
    })
  },

  onCompleted: function () {
    var self = this

    chrome.webNavigation.onCompleted.addListener(function (details) {
      if (details.frameId !== 0) return false

      var port = self.chross.port.getPortByTabId(details.tabId)

      port && port.postMessage({
        type: 'private',
        content: 'PageReady'
      })
    })
  },

  boot: function () {
    var self = this

    self.asyncInjectScripts = self.asyncInject.bind(self, true)
    self.syncInjectScripts = self.syncInject.bind(self, true)

    self.asyncInjectCss = self.asyncInject.bind(self, false)
    self.syncInjectCss = self.syncInject.bind(self, false)
  },

  init: function () {
    var self = this

    self.boot()
    /*
     * chross 提供的关键时刻：
     * onBeforeNavigate （chross私有级）预留
     * onCommitted （chross私有级）注入chross探针脚本和chross环境脚本
     * onDOMContentLoaded （chross用户级）注入用户脚本，用户脚本可以进行DOM级相关的处理
     * onCompleted （chross用户级）通知已经注入的用户脚本可以进行页面级相关的处理
     * */

    // 当导航即将发生时
    self.onBeforeNavigate()
    // 当一次导航提交时（文档以及它引用的资源，例如图片与子框架，可能还在下载，但是至少文档的一部分已经从服务器接收到，并且浏览器已经决定切换到新文档）
    self.onCommitted()
    // 当页面的 DOM 已完全构造时（但是此时引用的资源可能还未完成加载）
    self.onDOMContentLoaded()
    // 当文档（包括它所引用的资源）已经完全加载并初始化完成时
    self.onCompleted()
  }
})

module.exports = Navigation