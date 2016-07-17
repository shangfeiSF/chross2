var censusCore = require('censusCore')

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

        censusCore.executionRegistry[moment].forEach(function (taskName) {
          self.tasks[moment].push(censusCore.taskHandlers[taskName].bind(self))
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