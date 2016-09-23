var fs = require("fs")
var path = require('path')

var webpack = require('webpack')

var config = {
  sourceDir: './test/remote/src/main',
  destinationDir: './test/remote/build/main',
  outputFileName: '[name].bundle.js',
}

function makeEntry(config) {
  var sourceDir = config.sourceDir
  var entry = {}

  fs.readdirSync(sourceDir)
    .filter(function (file) {
      return fs.statSync(path.join(sourceDir, file)).isDirectory() && file !== 'web_modules'
    })
    .forEach(function (dir) {
      var dir = dir

      fs.readdirSync(path.join(sourceDir, dir))
        .forEach(function (file) {
          if (!fs.statSync(path.join(sourceDir, dir, file)).isDirectory()) {
            var basename = path.basename(file, '.test.js')
            var moduleName = path.basename(file, '.js')

            var key = path.join(dir, basename)

            entry[key] = [sourceDir, dir, moduleName].join('/')
          }
        })
    })

  return entry
}

module.exports = {
  entry: makeEntry(config),

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