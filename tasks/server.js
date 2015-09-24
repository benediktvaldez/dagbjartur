'use strict';

module.exports = function(gulp) {
  var modRewrite = require('connect-modrewrite');

  gulp.task('serve', ['server']);
  gulp.task('server', ['build'], function() {

    // Create rewriteRules for all root jade files
    var rewriteRules = [];

    // All paths that don't exist should redirect to index
    rewriteRules.push('!\\.html|\\.js|\\.svg|\\.css|\\.ico|\\.png|\\.jpg$ /index.html [L]');
    // var fs = require('fs');
    // var _ = require('underscore');
    // _.each(fs.readdirSync('./src/views'), function(fileName) {
    //   var name = fileName.replace('.jade','');
    //   rewriteRules.push('^/(' + name + ')$ /$1.html [L]');
    // });

    // http://www.browsersync.io/docs/options/
    gulp.plugin.browserSync.init({
      port: gulp.cfg.server.port,
      server: {
        baseDir: gulp.cfg.envdir,
      },
      ui: {
        port: gulp.cfg.server.uiport,
      },
      ghostMode: gulp.cfg.server.ghostMode,
      logLevel: gulp.cfg.verbose ? 'debug' : (gulp.cfg.debug ? 'info' : (gulp.cfg.silent ? 'warn' : 'info')),
      logFileChanges: true,
      logConnections: gulp.cfg.verbose || gulp.cfg.debug ? true : false,
      logPrefix: '-server-',
      open: false,
      reloadDelay: 500,
      notify: false,
      middleware: [
        modRewrite(rewriteRules)
      ]
    });

    gulp.start('watch');
  });
};
