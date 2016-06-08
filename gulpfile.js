/**
 * Created by wboll on 2016/6/2.
 */

const gulp = require('gulp'),
  del = require('del'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  spriter = require('gulp-css-spriter'),
  base64 = require('gulp-css-base64'),
  cleanCSS = require('gulp-clean-css'),
  babel = require('gulp-babel'),
  
  webpack = require('webpack'),
  webpackConfig = require('./webpack.config'),

  browserSync = require('browser-sync').create(),
  path = require('path');

gulp.task('pkgCodeMirrorScript', () => {
  return gulp.src(['./src/plugins/codemirror/codemirror.min.js', './src/plugins/codemirror/*.js'])
    .pipe(concat('codemirror-pkg.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/plugins/codemirror/'));
});

gulp.task('pkgCodeMirrorStyle', () => {
  return gulp.src('./src/plugins/codemirror/*.css')
    .pipe(concat('codemirror-pkg.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/plugins/codemirror/'));
});

gulp.task('beautifyHTML', () => {
  return gulp.src('./src/plugins/beautify-html.min.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/plugins/'))
});

gulp.task('plugins', ['pkgCodeMirrorScript', 'pkgCodeMirrorStyle', 'beautifyHTML']);

//拷贝图片到目标目录
gulp.task('copyImages', () => {
  gulp.src(['src/images/**/*'])
    .pipe(gulp.dest('dist/images'));
});

gulp.task('webpack', ['babel'], () => {
  webpack(webpackConfig, (err) => {
    if(err)throw err;
    gulp.src('./build/*.css')
      .pipe(concat('vueditor.min.css'))
      .pipe(cleanCSS())
      .pipe(gulp.dest('./dist/css/'));
    gulp.src(['./build/es6.js', './build/vueditor.js'])
      .pipe(concat('vueditor.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./dist/js/'));
  });
});

gulp.task('babel', () => {
  gulp.src(['./src/js/varibles.js', './src/js/util.js'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('es6.js'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('sprite', ['webpack'], () => {
  var timestamp = new Date().getTime();
  gulp.src(['./dist/css/style.min.css', './dist/css/components.min.css'])
    .pipe(spriter({
      spriteSheet: 'dist/images/spritesheet' + timestamp + '.png',
      pathToSpriteSheetFromCSS: '../images/spritesheet' + timestamp + '.png',
      spritesmithOptions: {
        padding: 10
      }
    }))
    .pipe(base64())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('clean', ['webpack'], () => {
  del(['./build/'], {force: true});    //TODO clean task not working
});

gulp.task('browserSync', () => {
  browserSync.init({
    notify: false,
    files: ['./dist/js/*.js', './dist/css/*.css'],
    server: {
      baseDir: './',
      index: 'test/index.html'
    }
  });
});

gulp.task('watch', ()  => {
  gulp.watch('src/**/*', ['copyImages', 'babel', 'webpack'/*, 'sprite'*/, 'clean']);
});

gulp.task('default', ['copyImages', 'babel', 'webpack'/*, 'sprite'*/, 'clean', 'watch']);