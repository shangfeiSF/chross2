var fs = require('fs')
var path = require('path')

var gulp = require('gulp')
var copy = require('gulp-copy')
var clean = require('gulp-clean')


var remote = path.join(__dirname, '../../remote')
var testRemote = path.join(__dirname, '../../test/remote')

gulp.task('clean', function () {
  fs.readdirSync(path.join(testRemote, 'components')).forEach(function (comp) {
    var comp = comp
    var web_modules = path.join(testRemote, 'components', comp, 'web_modules')

    if (fs.existsSync(web_modules)) {
      gulp.src(web_modules)
        .pipe(clean({force: true}))
    }
  })

  gulp.src(path.join(testRemote, 'web_modules'))
    .pipe(clean({force: true}))
})

gulp.task('default', function () {
  fs.readdirSync(path.join(remote, 'components')).forEach(function (comp) {
    var comp = comp
    var web_modules = path.join(remote, 'components', comp, 'web_modules')

    if (fs.existsSync(web_modules)) {
      gulp.src(path.join(web_modules, '*'))
        .pipe(gulp.dest(path.join(testRemote, 'components', comp, 'web_modules')))
    }
  })

  gulp.src(path.join(remote, 'web_modules', '*'))
    .pipe(gulp.dest(path.join(testRemote, 'web_modules')))
})