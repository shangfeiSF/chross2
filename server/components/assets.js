var express = require('express')

var routes = require('../routes')

module.exports = {
  start: function (app) {
    app.use(routes.remote.path, express.static(routes.remote.dir))
    app.use(routes.site.path, express.static(routes.site.dir))
    app.use(routes.tasks.path, express.static(routes.tasks.dir))

    app.get(routes.noFound, function (req, res) {
      setTimeout(function () {
        res.writeHead(404)
        res.end('noFound 404')
      }, 3000)
    })
  }
}