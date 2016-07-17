function Census(chross, config) {
  var config = config || {}

  var defaultConfig = {
    moments: [
      'onBeforeRequest',
      'onBeforeSendHeaders',
      'onSendHeaders',
      'onHeadersReceived',
      'onBeforeRedirect',
      'onResponseStarted',
      'onCompleted',
      'onErrorOccurred'
    ],

    malias: {
      brq: 'onBeforeRequest',
      bsh: 'onBeforeSendHeaders',
      sh: 'onSendHeaders',
      hr: 'onHeadersReceived',
      brd: 'onBeforeRedirect',
      rs: 'onResponseStarted',
      c: 'onCompleted',
      eo: 'onErrorOccurred'
    },
  }

  this.config = $.extend(defaultConfig, config)

  this.tasks = {}

  this.chross = chross

  this.init()
}

var core = {}

core.taskHandlers = {
  cnesusFrameDetails: function (details) {
    var self = this
    var cache = self.chross.cache
    var tabId = details.tabId

    var needRecord = true
    var result = cache.getInCurrentBVS('frameList', tabId)

    if (result.key === undefined) {
      needRecord = true
    }
    else {
      needRecord = result.value.every(function (iframe) {
        return iframe.frameId != details.frameId
      })
    }

    if (needRecord) {
      cache.setInCurrentBVS('frameIds', details.frameId, tabId)

      cache.setInCurrentBVS('frameList', {
        frameId: details.frameId,
        url: details.url,
        details: details
      }, tabId)
    }
  },
}
var executionRegistry = {
  onBeforeRequest: ['cnesusFrameDetails'],
  onBeforeSendHeaders: [],
  onSendHeaders: [],
  onHeadersReceived: [],
  onBeforeRedirect: [],
  onResponseStarted: [],
  onCompleted: [],
  onErrorOccurred: []
}

$.extend(Census.prototype,
  {
    merge: function () {
      var self = this
      var moments = self.config.moments

      moments.forEach(function (moment) {
        var userTasks = self.chross.userTasks[moment]

        userTasks.forEach(function (task) {
          self.tasks[moment].push(task.bind(self))
        })
      })
    },

    boot: function () {
      var self = this
      var moments = self.config.moments

      moments.forEach(function (moment) {
        self.tasks[moment] = new Array()

        executionRegistry[moment].forEach(function (taskName) {
          self.tasks[moment].push(core.taskHandlers[taskName].bind(self))
        })
      })
    },

    init: function () {
      var self = this

      self.boot()
      self.merge()
    },
  }
)

module.exports = Census