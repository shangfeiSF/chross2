var Suite = require('suite')

var sources = ['tabStore', 'userTabStore']
var suite = new Suite(sources)

suite.fetch(function (error, data) {
  var mock = {tabId: 123}
  sources.forEach(function (source, index) {
    mock[source] = data[index][0][source]
  })

  this.mock = mock
  this.test()
})