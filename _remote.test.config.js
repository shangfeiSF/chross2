var path = require('path')

var modules = {
  cache: {
    belongsto: 'background',
    relativepath: 'web_modules/cache'
  },
  network: {
    belongsto: 'background',
    relativepath: 'web_modules/network'
  }
}

function build(modules) {
  var result = {}
  var modules = modules

  Object.keys(modules).forEach(function (name) {
    var module = modules[name]

    result[name] = {
      belongsto: module.belongsto,
      path: path.join(module.belongsto, module.relativepath)
    }
  })

  return result
}

module.exports = build(modules)