var fs = require('fs')
var path = require('path')

var gulp = require('gulp')
var copy = require('gulp-copy')
var replace = require('gulp-replace')
var minimist = require('minimist')

var extension = path.join(__dirname, '../../extension')
var bundle = path.join(__dirname, '../../_bundle.extension_')

var options = minimist(process.argv.slice(2), {
  string: 'host',
  default: {host: 'localhost'}
})

gulp.task('default', function () {
  return gulp.src(path.join(extension, '/**/*'))
    .pipe(replace(/localhost/g, options.host))
    .pipe(gulp.dest(bundle))
})