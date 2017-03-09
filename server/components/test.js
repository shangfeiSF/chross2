var fs = require('fs')
var path = require('path')

var Promise = require("bluebird")
Promise.promisifyAll(fs)

var express = require('express')

var routes = require('../routes')
var tabStoreDir = routes.getTabStore.dir

module.exports = {
  start: function (app) {
    app.use(routes.testBundle.path, express.static(routes.testBundle.dir))
    app.use(routes.testAssets.path, express.static(routes.testAssets.dir))
    app.use(routes.testRemote.path, express.static(routes.testRemote.dir))

    app.get(routes.getNewestTabStore.path, function (req, res) {
      fs.readdirAsync(tabStoreDir)
        .then(function (names) {
          return names.map(function (name, index) {
            return {
              index: index,
              name: name
            }
          })
        })
        .filter(function (file) {
          return fs.statAsync(path.join(tabStoreDir, file.name))
            .then(function (stat) {
              return !stat.isDirectory()
            })
        })
        .map(function (file) {
          return fs.statAsync(path.join(tabStoreDir, file.name))
            .then(function (stat) {
              return {
                index: file.index,
                name: file.name,
                stat: stat
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

          if (!newest) {
            return ''
          } else {
            return fs.readFileAsync(path.join(tabStoreDir, newest.name))
          }
        })
        .then(function (content) {
          var content = content.toString('utf-8')
          res.writeHead(200)
          res.end(content)
        })
    })
  }
}