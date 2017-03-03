var $ = require('jquery')

function Page(config) {
  var config = config || {}

  var defaultConfig = {}

  this.config = $.extend(defaultConfig, config)

  this.background = chrome.extension.getBackgroundPage()
}

$.extend(Page.prototype, {
  init: function () {
    var self = this

    self.render()
    self.bind()
  },

  render: function () {
    var self = this
    var start = $('<input>').attr({
      id: 'start',
      type: 'button',
      value: 'Fetch userScript and urlsList'
    }).css({
      height: 40
    })

    self.start = start

    $('body').append(start)
  },

  bind: function () {
    var self = this

    self.start.on('click', function () {
      self.background.chross.loader.start()
    })
  }
})

var page = new Page()

page.init()