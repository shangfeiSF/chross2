var fs = require('fs')
var path = require('path')

var Promise = require("bluebird")
Promise.promisifyAll(fs)

var colors = require('colors')
var express = require('express')
var multiparty = require('multiparty')
var bodyParser = require('body-parser')

var Hash = require('./hash')
var hash = new Hash({
  algorithms: 'RSA-SHA1-2',
  encoding: 'hex'
})

var routes = require('../routes')

module.exports = {
  start: function (app) {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))

    app.use(routes.getTabStore.path, express.static(routes.getTabStore.dir))

    app.post('/recordTabStore', function (req, res) {
      var form = new multiparty.Form({
        'uploadDir': routes.getTabStore.dir
      })

      var parseAsync = Promise.promisify(form.parse, {
        context: form,
        multiArgs: true
      })

      parseAsync(req)
        .then(function (result) {
          return {
            path: routes.getTabStore.dir,
            name: [hash.gen(), 'json'].join('.'),
            content: JSON.stringify({
              "tabStore": JSON.parse(result.shift()['tabStore'].pop())
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