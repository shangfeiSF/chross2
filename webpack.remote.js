var fs = require("fs")
var path = require('path')
var webpack = require('webpack')

var config = {
  sourceDir: './public/remote/src/main',
  destinationDir: './public/remote/build/main',
  outputFileName: '[name].bundle.js',

  commonModulesDir: 'web_modules',
  moduleEntryFileName: 'index'
}

function makeEntry(config) {
  var sourceDir = config.sourceDir
  var entry = {}

  fs.readdirSync(sourceDir)
    .filter(function (file) {
      return file !== config.commonModulesDir && fs.statSync(path.join(sourceDir, file)).isDirectory()
    })
    .forEach(function (dir) {
      entry[dir] = [sourceDir, dir, config.moduleEntryFileName].join('/')
    })

  return entry
}

module.exports = {
  entry: makeEntry(config),

  output: {
    path: config.destinationDir,
    filename: config.outputFileName
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery"
    })
  ]
}