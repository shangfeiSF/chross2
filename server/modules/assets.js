var path = require('path')
var express = require('express')

module.exports = {
  start: function (app) {
    app.use('/remote', express.static(path.join(__dirname, '../../', '_bundle.remote_')))
    app.use('/public', express.static(path.join(__dirname, '../webSite')))
    app.use('/tasks', express.static(path.join(__dirname, '../tasks')))

    app.get('/noFound.js', function (req, res) {
      setTimeout(function () {
        res.writeHead(404)
        res.end('noFound 404')
      }, 3000)
    })
  }
}