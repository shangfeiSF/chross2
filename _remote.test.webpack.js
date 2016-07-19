var fs = require("fs")
var path = require('path')

var webpack = require('webpack')

var config = {
  sourceDir: './public/remote/src/main',
  destinationDir: './public/remote/src/test',
  unit: './unit',
  outputFileName: '[name].bundle.js',
}

var modules = require('./_remote.test.config.js')

function makeEntry(modules) {
  var entry = {}
  var modules = modules

  Object.keys(modules).forEach(function (name) {
    var module = modules[name]

    var key = path.join(config.unit, module.belongsto, 'node_modules', name)
    entry[key] = [config.sourceDir, module.path].join('/')
  })

  return entry
}

console.log(JSON.stringify(makeEntry(modules), null, 2))

module.exports = {
  entry: makeEntry(modules),

  output: {
    path: config.destinationDir,
    filename: config.outputFileName,
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery"
    })
  ]
}