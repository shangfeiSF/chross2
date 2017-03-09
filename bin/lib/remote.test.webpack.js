var fs = require("fs")
var path = require('path')

var webpack = require('webpack')

var testBundle = path.join(__dirname, '../../test/_bundle.remote_')
var testRemote = path.join(__dirname, '../../test/remote')

module.exports = {
  devtool: 'inline-source-map',

  entry: (function () {
    var entry = {}
    var components = path.join(testRemote, 'components')

    fs.readdirSync(components).forEach(function (comp) {
      fs.readdirSync(path.join(components, comp)).filter(function (module) {
        var index = fs.readdirSync(path.join(components, comp, module)).filter(function (file) {
          return file === 'index.js'
        })

        if (index.length) {
          entry[path.join(comp, module)] = path.join(components, comp, module, 'index.js')
        }
      })
    })

    return entry
  })(),

  output: {
    path: path.join(testBundle, 'components'),
    filename: '[name].bundle.js',
  },

  resolve: {
    modules: ['web_modules', 'node_modules']
  }
}