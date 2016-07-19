var fs = require("fs")
var path = require('path')

var config = {
  sourceDir: './public/remote/src/main',
  destinationDir: './test/remote/src/main',
  modulesDir: 'web_modules'
}

function makeCopy(config) {
  var sourceDir = config.sourceDir
  var modulesDir = config.modulesDir

  var result = {
    copy: {},
    tasks: []
  }

  fs.readdirSync(sourceDir)
    .filter(function (file) {
      return fs.statSync(path.join(sourceDir, file)).isDirectory()
    })
    .forEach(function (dir) {
      var taskName = dir + 'Copy'

      result.tasks.push('copy:' + taskName)

      result.copy[taskName] = {
        files: [{
          expand: true,
          cwd: path.join(sourceDir, dir, modulesDir),
          src: ['*.js'],
          dest: path.join(config.destinationDir, dir, modulesDir)
        }]
      }
    })

  return result
}

function makeClean(config) {
  var destinationDir = config.destinationDir
  var modulesDir = config.modulesDir

  var result = {
    clean: [],
  }

  fs.readdirSync(destinationDir)
    .filter(function (file) {
      return fs.statSync(path.join(destinationDir, file)).isDirectory()
    })
    .forEach(function (dir) {
      result.clean.push(path.join(destinationDir, dir, modulesDir))
    })
  
  return result
}

var makeCopyResult = makeCopy(config)
var makeCleanResult = makeClean(config)

var initConfig = {
  copy: makeCopyResult.copy,
  clean: makeCleanResult.clean
}

module.exports = function (grunt) {
  grunt.file.defaultEncoding = 'utf-8'

  grunt.initConfig(initConfig)

  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-clean')

  grunt.registerTask('default', makeCopyResult.tasks)
}