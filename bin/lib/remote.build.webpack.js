var fs = require("fs")
var path = require('path')

var webpack = require('webpack')

var remote = path.join(__dirname, '../../remote')
var bundle = path.join(__dirname, '../../_bundle.remote_')

module.exports = {
  entry: (function () {
    var components = path.join(remote, 'components')
    var entry = {}
    fs.readdirSync(components).forEach(function (comp) {
      entry[comp] = path.join(components, comp, 'index.js')
    })
    return entry
  })(),

  output: {
    path: path.join(bundle, 'components'),
    filename: '[name].bundle.js',
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery"
    })
  ]
}