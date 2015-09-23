'use strict';
var content = require('../helpers/content');

module.exports = function(gulp) {
  var options = gulp.cfg.templates.jade;
  options.data = {};
  options.data.content = content.getAll();
  options.data.env = gulp.cfg.env;
  options.data.flags = gulp.plugin.util.env;

  gulp.task('templates', function() {
    options.data.content = content.getAll();

    return gulp.src(gulp.cfg.templates.src)
      .pipe ( gulp.plugin.plumber({errorHandler: gulp.plugin.notify.onError('<%= error.message %>')}) )
      .pipe ( gulp.plugin.jade(options) )

      .pipe ( gulp.dest(gulp.cfg.envdir) )
      .pipe ( gulp.plugin.browserSync.stream() );
  });
};
