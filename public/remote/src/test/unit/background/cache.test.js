var fs = require('fs')
var path = require('path')

var expect = require('chai').expect
var colors = require('colors')
var Promise = require("bluebird")

var Cache = require('cache.bundle.js')

Promise.promisifyAll(fs)

var config = {
  tabId: 123,
  tabStoreDataFrom: path.join(__dirname, '../../../../../../../server/tabStore')
}

fs.readdirAsync(config.tabStoreDataFrom)
  .then(function (names) {
    return names.map(function (name, index) {
      return {
        index: index,
        name: name
      }
    })
  })
  .filter(function (file) {
    return fs.statAsync(path.join(config.tabStoreDataFrom, file.name))
      .then(function (stat) {
        return !stat.isDirectory()
      })
  })
  .map(function (file) {
    var stat = fs.statAsync(path.join(config.tabStoreDataFrom, file.name))

    var contents = fs.readFileAsync(path.join(config.tabStoreDataFrom, file.name))

    /* Promise.join */
    return Promise.join(stat, contents, function (stat, contents) {
      return {
        index: file.index,
        name: file.name,
        stat: stat,
        contents: contents
      }
    })
  })
  .call("sort", function (file1, file2) {
    var mtime1 = +new Date(file1.stat.mtime)
    var mtime2 = +new Date(file2.stat.mtime)

    return mtime2 - mtime1
  })
  .then(function (files) {
    var newest = files[0]

    if (!newest) return false

    var chross = {}
    var cache = new Cache(chross)

    cache.tabsMap[config.tabId] = JSON.parse(newest.contents).tabStore
  })