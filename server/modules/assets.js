var path = require('path')
var express = require('express')

var config = {
  dirs: {
    publicDir: '../public',
    remoteDir: '../public/remote/build',
    webSiteDir: './webSite'
  }
}

module.exports = {
  start: function (main) {
    var app = main.app
    var rootDir = main.rootDir

    app.use(express.static(path.join(rootDir, config.dirs.remoteDir)))
    app.use(express.static(path.join(rootDir, config.dirs.publicDir)))
    app.use(express.static(path.join(rootDir, config.dirs.webSiteDir)))
  }
}