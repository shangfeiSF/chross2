var fs = require('fs')
var path = require('path')

var express = require('express')
var Promise = require("bluebird")

Promise.promisifyAll(fs)

var config = {
  dirs: {
    libDir: '../server/testPages/lib',
    testModulesDir: '../test/remote/build',
    testUnitsDir: '../server/testPages/remote',

    tabStoreDir: './tabStore'
  }
}


module.exports = {
  start: function (main) {
    var app = main.app
    var rootDir = main.rootDir

    var tabStoreDir = path.join(rootDir, config.dirs.tabStoreDir)

    app.get('/tabstore/newest.json', function (req, res) {
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

    app.use(express.static(path.join(rootDir, config.dirs.libDir)))
    app.use(express.static(path.join(rootDir, config.dirs.testModulesDir)))
    app.use(express.static(path.join(rootDir, config.dirs.testUnitsDir)))
  },
}