'use strict';


// Dependencies
var gulp = require('gulp'),
      sass = require('gulp-sass'),
      iconfont = require('gulp-iconfont'),
      consolidate = require('gulp-consolidate'),
      svgmin = require('gulp-svgmin');


// iconfont
gulp.task('iconfont', function () {
  gulp.src('_src/img/svg-icons/**/*.svg') // location of svg icons

    // minify svg files
    .pipe(svgmin())

      // options can be changed
      //.pipe(svgmin({
      //    plugins: [{
      //        removeDoctype: true
      //    }, {
      //        removeComments: true
      //    }, {
      //        cleanupNumericValues: {
      //            floatPrecision: 2
      //        }
      //    }, {
      //        convertColors: {
      //            names2hex: true,
      //            rgb2hex: true
      //        }
      //    }]
      //}))

    // generate icon-font files
    .pipe(iconfont({
          // main name of icon-font files
          fontName: 'icons_font',

          // Calculates glyph size and centering
          centerHorizontally: true,

          // Standardization of icons by scaling
          // relative to the size of the largest icon
          normalize: true,

          // Unicode assigns to each icon for use in CSS
          appendUnicode: false,

          // font formats
          formats: ['svg', 'ttf', 'eot', 'woff', 'woff2']

    }))

    // Call module generates the CSS
    .on('glyphs', function (glyphs) {

      // Location of template SASS
      gulp.src('_src/scss/svg-to-font-template/_icons-font.scss')

        // Template engine Call
        .pipe(consolidate('lodash', {
            // Code dots present in the CSS property "content"
            glyphs: glyphs,

            // font name
            fontName: 'icons_font',

            // destination to fonts in result CSS
            fontPath: '../fonts/',

            // Name of the main class , common to all icons
            className: 'icon-font'
        }))

        // Destination of SASS file that will then generate CSS
        .pipe(gulp.dest('_src/scss/sprites/'));
    })

    // description for generated font files
    .pipe(gulp.dest('template/fonts'));
});


// SASS to CSS
gulp.task('sass', function () {

  // Location of SASS files
  gulp.src('_src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))

    // SASS execution for compilation
    .pipe(sass({
      indentWidth: 4
    , outputStyle: 'expanded'
    }))

    // Destination CSS files
    .pipe(gulp.dest('template/css'));
});


// Default
gulp.task('default', ['sass'], function () {

  // Generate CSS files for each change of SASS files
  gulp.watch('scss/**/*.scss', ['sass']);
});

