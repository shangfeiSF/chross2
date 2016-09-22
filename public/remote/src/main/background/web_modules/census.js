var censusCore = require('censusCore')
var momentsConfig = require('momentsConfig')

function Census(chross, config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(true, defaultConfig, config)

  this.tasks = {}

  this.chross = chross

  this.init()
}

$.extend(Census.prototype,
  momentsConfig,
  {
    merge: function () {
      var self = this
      var moments = self.moments

      moments.forEach(function (moment) {
        var userTasks = self.chross.userTasks[moment]

        userTasks.forEach(function (task) {
          self.tasks[moment].push(task.bind(self))
        })
      })
    },

    boot: function () {
      var self = this
      var moments = self.moments

      moments.forEach(function (moment) {
        self.tasks[moment] = new Array()

        censusCore.executionRegistry[moment].forEach(function (taskName) {
          self.tasks[moment].push(censusCore.taskHandlers[taskName].bind(self))
        })
      })
    },

    init: function () {
      var self = this

      // 这样可以避免在本地单元测试时报错
      if (self.chross !== undefined && !self.chross['onlyBoot']) {
        self.boot()
        self.merge()
      }
    },
  }
)

module.exports = Census