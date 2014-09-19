'use strict';

// ========================================
// APP CONFIGURATION
// ========================================
var appRoot = 'app';
var htmlFiles = 'app/**.html';
var cssPath = 'app/assets/css/';
var jsPath = 'app/assets/js/';
var scssFiles = 'assets/scss/**.scss';
var mainScssFile = 'assets/scss/main.scss';
var jsFiles = 'assets/js/**.js';
var jsConcatName = 'main.js';



// ========================================
// GULP CONFIGURATION
// ========================================
var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var concat = require('gulp-concat');



// ========================================
// TASKS
// ========================================
gulp.task('connect', function() {
  connect.server({
    root: appRoot,
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src(htmlFiles)
    .pipe(connect.reload());
});

gulp.task('scss', function() {
  gulp.src(mainScssFile)
    .pipe(sass())
    .pipe(gulp.dest(cssPath))
    .pipe(connect.reload());
});

gulp.task('scripts', function() {
  gulp.src(jsFiles)
    .pipe(concat(jsConcatName))
    .pipe(gulp.dest(jsPath))
    .pipe(connect.reload());
});

gulp.task('watch', ['html', 'scss'], function() {
  gulp.watch([htmlFiles], ['html']);
  gulp.watch([scssFiles], ['scss']);
  gulp.watch([jsFiles], ['scripts']);
});

gulp.task('dev', ['connect', 'watch']);
