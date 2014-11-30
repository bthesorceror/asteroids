var gulp       = require('gulp');
var stylus     = require('gulp-stylus');
var plumber    = require('gulp-plumber');
var browserify = require('gulp-browserify');

gulp.task('build-scripts', function() {
  gulp.src('client/application.js').
    pipe(plumber()).
    pipe(browserify()).
    pipe(gulp.dest('public/javascripts'));
});

gulp.task('build-styles', function() {
  gulp.src('styles/application.styl').
    pipe(plumber()).
    pipe(stylus()).
    pipe(gulp.dest('public/stylesheets'));
});

gulp.task('watch-styles', function() {
  gulp.watch('styles/*.styl', ['build-styles']);
});

gulp.task('watch-scripts', function() {
  gulp.watch('client/**/*.js', ['build-scripts']);
});

gulp.task('watch', ['watch-styles', 'watch-scripts']);
gulp.task('build', ['build-styles', 'build-scripts']);

gulp.task('default', function() {
  console.log('Default task');
});
