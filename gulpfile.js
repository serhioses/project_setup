const gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-ruby-sass'),
  imagemin = require('gulp-imagemin'),
  cssmin = require('gulp-cssmin'),
  newer = require('gulp-newer'),
  rename = require('gulp-rename')
  merge = require('merge-stream'),
  watch = require('gulp-watch'),
  debug = require('gulp-debug')
  path = require('path'),
  devDir = 'app/dev',
  distDir = 'app/dist',
  paths = {
    sass: {
      default: devDir + '/sass',
      header: devDir + '/sass/header',
      content: devDir + '/sass/content'
    },
    cssDev: devDir + '/css',
    cssDist: distDir + '/css',
    imgDev: devDir + '/images',
    imgDist: distDir + '/images'
  },
  browsers = ['> 5%', 'Firefox > 10', 'ie >= 9', 'Chrome > 20', 'Safari > 3'],
  isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

gulp.task('styles:header', function () {
  return sass(paths.sass.header + '/style.scss', {
    style: 'expanded',
    loadPath: [paths.sass.default]
  })
    .pipe(autoprefixer({
      browsers: browsers
    }))
    .pipe(rename('header.css'))
    .pipe(gulp.dest(paths.cssDist));
});

gulp.task('styles:content', function () {
  return sass(paths.sass.content + '/style.scss', {
    style: 'expanded',
    loadPath: [paths.sass.default]
  })
    .pipe(autoprefixer({
      browsers: browsers
    }))
    .pipe(rename('content.css'))
    .pipe(gulp.dest(paths.cssDist));
});

gulp.task('minifycss', function () {
  return gulp.src([paths.cssDev + '/*.css', paths.cssDist + '/header.css', paths.cssDist + '/content.css'])
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.cssDist));
});

gulp.task('images', function() {
  return gulp.src(paths.imgDev + '/*')
    .pipe(newer(paths.imgDist))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.imgDist));
});

gulp.task('watch', function () {
  gulp.watch(paths.sass.default + '/**/*', gulp.series('styles:header', 'styles:content', 'minifycss'));
  gulp.watch(paths.imgDev + '/*', gulp.series('images'));
});

gulp.task('default', gulp.parallel('watch', 'images'));
