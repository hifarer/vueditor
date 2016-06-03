/**
 * Created by wboll on 2016/6/2.
 */

const gulp = require('gulp'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  fileinclude = require('gulp-file-include'),
  spriter = require('gulp-css-spriter'),
  base64 = require('gulp-css-base64'),
  cleanCSS = require('gulp-clean-css'),
  
  webpack = require('webpack'),
  webpackConfig = require('./webpack.config'),

  browserSync = require('browser-sync').create(),
  path = require('path');


gulp.task('pkgCodeMirrorScript', () => {
  return gulp.src(['./src/plugins/codemirror/codemirror.min.js', './src/plugins/codemirror/*.js'])
    .pipe(concat('codemirror-pkg.js'))
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/plugins/codemirror/'));
});

gulp.task('pkgCodeMirrorStyle', () => {
  return gulp.src('./src/plugins/codemirror/*.css')
    .pipe(concat('codemirror-pkg.css'))
    .pipe(rename({suffix:'.min'}))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/plugins/codemirror/'));
});

gulp.task('beautifyHTML', () => {
  return gulp.src('./src/plugins/beautify-html.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist/plugins/'))
});

gulp.task('plugins', ['pkgCodeMirrorScript', 'pkgCodeMirrorStyle', 'beautifyHTML']);

//拷贝图片到目标目录
gulp.task('copyImages', () => {
  gulp.src(['src/images/**/*'])
    .pipe(gulp.dest('dist/images'));
});

gulp.task('includeFile', () => {
  gulp.src(['test/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('test/'));
});

gulp.task('webpack', ['includeFile'], () => {
  webpack(webpackConfig, (err) => {
    if(err)throw err;
    gulp.src('./build/*.css')
      .pipe(clean())
      .pipe(cleanCSS())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./dist/css/'));
    gulp.src('./build/vueditor.js')
      .pipe(clean())
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./dist/js/'));
    gulp.src('./build/style.js')
      .pipe(clean());
  });
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

gulp.task('browserSync', function() {
  browserSync.init({
    notify: false,
    files: ['./dist/js/*.js', './dist/css/*.css'],
    server: {
      baseDir: './',
      index: 'test/index.html'
    }
  });
});

gulp.task('watch', ['browserSync'], ()  => {
  gulp.watch('src/**/*', ['copyImages', 'includeFile', 'webpack'/*, 'sprite'*/]);
});

gulp.task('default', ['copyImages', 'includeFile', 'webpack'/*, 'sprite'*/, 'watch']);