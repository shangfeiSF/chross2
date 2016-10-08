var urlFilter = require('urlFilter')
var Cache = require('cache')
var Network = require('network')
var Navigation = require('navigation')
var Probe = require('probe')
var Agent = require('agent')
var Port = require('port')
var Loader = require('loader')

function Chross(config) {
  var config = config || {}

  var defaultConfig = {
    crossIframeURL: '//gtms04.alicdn.com/tps/i4/TB1vX.wKVXXXXX7XXXX_RF9JFXX-1-1.gif'
  }

  this.config = $.extend(true, {}, defaultConfig, config)

  this.commonCode = [
    '/* This is common code injected by chross */',
    'var chross = window.chross;',
    'var $ = window.$;',
    'console.log("%cInjected user content", "color: #00ff00; font-weight: bold;");',
    '/* This is code injected by user */',
    '',
  ].join('\n')

  this.userScript = ''

  this.urlsList = []

  this.userTasks = {
    onBeforeRequest: [],
    onBeforeSendHeaders: [],
    onSendHeaders: [],
    onHeadersReceived: [],
    onBeforeRedirect: [],
    onResponseStarted: [],
    onCompleted: [],
    onErrorOccurred: []
  }
}

$.extend(Chross.prototype, {
  updateUserScript: function (userScript) {
    var self = this

    self.userScript = self.commonCode + $.trim(userScript.toString())
  },

  updateUrlsList: function (urlsList) {
    var self = this

    self.urlsList = urlsList
  },

  boot: function () {
    var self = this

    self.urlFilter = new urlFilter(this)

    self.cache = new Cache(this)

    self.network = new Network(this)

    self.navigation = new Navigation(this)

    self.probe = new Probe(this)

    self.agent = new Agent(this)

    self.port = new Port(this)

    self.loader = new Loader(this)
  },

  init: function () {
    var self = this

    self.boot()
  }
})

module.exports = Chross