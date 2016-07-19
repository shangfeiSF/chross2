var fs = require('fs')
var path = require('path')

var colors = require('colors')
var Promise = require("bluebird")

var express = require('express')
var multiparty = require('multiparty')
var bodyParser = require('body-parser')

var Hash = require('./hash')

Promise.promisifyAll(fs)

var hash = new Hash({
  algorithms: 'RSA-SHA1-2',
  encoding: 'hex'
})

var config = {
  virtualRoutes: {
    getTabStore: '/getTabStore',
  },

  dirs: {
    tabStoreDir: './tabStore'
  }
}

module.exports = {
  start: function (main) {
    var app = main.app
    var rootDir = main.rootDir

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({
      extended: true
    }))

    app.use(config.virtualRoutes.getTabStore, express.static(path.join(rootDir, config.dirs.tabStoreDir)))

    app.post('/recordTabStore', function (req, res) {
      var form = new multiparty.Form({
        'uploadDir': config.dirs.tabStoreDir
      })
      /* promisify the form.parse */
      var parseAsync = Promise.promisify(form.parse, {
        context: form,
        multiArgs: true
      })

      parseAsync(req)
        .then(function (result) {
          var tabStore = JSON.parse(result.shift()['tabStore'].pop())

          return {
            path: path.join(rootDir, config.dirs.tabStoreDir),
            name: [hash.gen(), 'json'].join('.'),
            content: JSON.stringify({
              "tabStore": tabStore
            }, null, 2),
            encode: 'utf8'
          }
        })
        .then(function (file) {
          return fs.writeFileAsync(path.join(file.path, file.name), file.content, file.encode)
        })
        .then(function () {
          res.send({
            status: 200,
            msg: 'ok'
          })
        })
        .catch(function (error) {
          res.send({
            status: 500,
            msg: error
          })
        })
    })
  }
}