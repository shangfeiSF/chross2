// 开发阶段固化在本地的测试脚本
var testCode = $.trim(
  (function () {
    console.info(chross)

    var body = $('body')
    body.attr('data-test', 'chross')

    chross.probe.runCodeInIframe(
      function () {
        var body = document.getElementsByTagName('body')[0] || null
        return body ? body.children.length : null
      },
      {
        listener: function (result) {
          console.info(result.frameId, result.data.value)
        }
      }
    )
  })
    .toString()
    .slice(14, -2)
)

var Port = require('port')
var Probe = require('probe')
var Cache = require('cache')
var Agent = require('agent')
var Network = require('network')
var Navigation = require('navigation')

function Chross(config) {
  var config = config || {}

  var defaultConfig = {
    crossIframeURL: '//gtms04.alicdn.com/tps/i4/TB1vX.wKVXXXXX7XXXX_RF9JFXX-1-1.gif'
  }

  this.config = $.extend(defaultConfig, config)

  this.commonCode = 'var chross = window.chross; var $ = window.$;'

  this.userScript = ''
}

$.extend(Chross.prototype, {
  updateUserScript: function (code) {
    var self = this

    self.userScript = self.commonCode + $.trim(code.toString())
  },

  boot: function () {
    var self = this

    self.network = new Network(this)

    self.navigation = new Navigation(this)

    self.cache = new Cache(this)

    self.probe = new Probe(this)

    self.agent = new Agent(this)

    self.port = new Port(this)
  },

  init: function () {
    var self = this

    self.boot()

    // 开发阶段模拟获取到用户上传的脚本代码
    self.updateUserScript(testCode)
  }
})

module.exports = Chross