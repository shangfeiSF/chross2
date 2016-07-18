var crypto = require('crypto')

function Hash(config) {
  this.algorithms = config.algorithms
  this.encoding = config.encoding
}

Hash.prototype.gen = function (originalDiff) {
  var self = this
  var originalDiff = originalDiff || 'chross'

  var stamp = parseInt(
    +new Date()
    + Math.floor(Math.random() * 5E10)
  )

  var generator = crypto.createHash(self.algorithms)

  var encrypted = ''
  generator.update(originalDiff + stamp)
  encrypted += generator.digest(self.encoding)

  return encrypted.length ? encrypted : stamp
}

module.exports = Hash