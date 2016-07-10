var fs = require("fs")
var path = require('path')

var config = {
  sourceDir: './public/extension/src',
  destinationDir: './public/extension/build',

  jsFileName: 'index.js',
  replacements: [{
    from: "localhost",
    to: "www.temp.com"
  }]
}

function makeReplace(config) {
  var buildMainDir = path.join(config.destinationDir, './main')
  var result = {
    replace: {},
    tasks: []
  }

  var exist = fs.existsSync(buildMainDir)

  if (exist) {
    fs.readdirSync(buildMainDir)
      .filter(function (file) {
        return fs.statSync(path.join(buildMainDir, file)).isDirectory()
      })
      .forEach(function (dir) {
        var taskName = dir + 'HostReplace'

        result.tasks.push('replace:' + taskName)

        result.replace[taskName] = {
          src: [path.join(buildMainDir, dir, config.jsFileName)],
          dest: [path.join(buildMainDir, dir, config.jsFileName)],
          replacements: config.replacements
        }
      })
  }

  return result
}

var makeReplaceResult = makeReplace(config)

var initConfig = {
  copy: {
    static: {
      files: [
        {
          cwd: config.sourceDir,
          src: '**/*',
          dest: config.destinationDir,
          expand: true
        },
      ]
    }
  },

  replace: makeReplaceResult.replace
}

module.exports = function (grunt) {
  grunt.file.defaultEncoding = 'utf-8'

  grunt.initConfig(initConfig)

  grunt.loadNpmTasks('grunt-text-replace')
  grunt.loadNpmTasks('grunt-contrib-copy')

  grunt.registerTask('build', ['copy:static'])
  grunt.registerTask('hostReplace', makeReplaceResult.tasks)
}
