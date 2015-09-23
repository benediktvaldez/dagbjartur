'use strict';

module.exports = function(gulp) {
  var merge = require('merge-stream');
  var noop = gulp.plugin.util.noop;

  var path = require('path');
  gulp.task('copy', function() {
    var ico = gulp.src(gulp.cfg.ico.src)
      .pipe ( !gulp.cfg.debug ? noop() : gulp.plugin.debug({title:'--ico:'}) )
      .pipe( gulp.dest(path.join(gulp.cfg.envdir, gulp.cfg.ico.subDir)) );

    var svg = gulp.src(gulp.cfg.svg.src)
      .pipe ( !gulp.cfg.debug ? noop() : gulp.plugin.debug({title:'--svg:'}) )
      .pipe( gulp.dest(path.join(gulp.cfg.envdir, gulp.cfg.svg.subDir)) );

    var fonts = gulp.src(gulp.cfg.fonts.src)
      .pipe ( !gulp.cfg.debug ? noop() : gulp.plugin.debug({title:'--fonts:'}) )
      .pipe( gulp.dest(path.join(gulp.cfg.envdir, gulp.cfg.fonts.subDir)) );

    var videos = gulp.src(gulp.cfg.videos.src)
      .pipe ( !gulp.cfg.debug ? noop() : gulp.plugin.debug({title:'--videos:'}) )
      .pipe( gulp.dest(path.join(gulp.cfg.envdir, gulp.cfg.videos.subDir)) );

    return merge(ico, svg, fonts, videos);
  });
};
