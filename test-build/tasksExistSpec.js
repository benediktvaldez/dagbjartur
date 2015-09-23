'use strict';

var gulp = require('gulp'),
    path = require('path');

gulp.cfg = require('../gulp-config.json');
gulp.plugin = require('gulp-load-plugins')();
gulp.cfg.env = gulp.cfg.envdir.hasOwnProperty(gulp.plugin.util.env.env) ? gulp.plugin.util.env.env : gulp.cfg.defaultEnv;
gulp.cfg.envdir = gulp.cfg.envdir[gulp.cfg.env];
gulp.cfg.envdirEn = path.join(gulp.cfg.envdir, 'en');

var loadTasks = require('gulp-load')(gulp);
loadTasks(path.resolve(__dirname + '/..'));

describe('Task runner', function() {
  it('should have a babel task ', function() {
    expect(gulp.hasTask('babel')).toBe(true);
  });
  it('should have a build task ', function() {
    expect(gulp.hasTask('build')).toBe(true);
  });
  it('should have a clean task ', function() {
    expect(gulp.hasTask('clean')).toBe(true);
  });
  it('should have a copy task ', function() {
    expect(gulp.hasTask('copy')).toBe(true);
  });
  it('should have a default task ', function() {
    expect(gulp.hasTask('default')).toBe(true);
  });
  it('should have a images task ', function() {
    expect(gulp.hasTask('images')).toBe(true);
  });
  it('should have a jshint-babel task ', function() {
    expect(gulp.hasTask('jshint-babel')).toBe(true);
  });
  it('should have a jshint-scripts task ', function() {
    expect(gulp.hasTask('jshint-scripts')).toBe(true);
  });
  it('should have a run task ', function() {
    expect(gulp.hasTask('run')).toBe(true);
  });
  it('should have a scripts task ', function() {
    expect(gulp.hasTask('scripts')).toBe(true);
  });
  it('should have a server task ', function() {
    expect(gulp.hasTask('server')).toBe(true);
  });
  it('should have a styles task ', function() {
    expect(gulp.hasTask('styles')).toBe(true);
  });
  it('should have a templates task ', function() {
    expect(gulp.hasTask('templates')).toBe(true);
  });
  it('should have a watch task ', function() {
    expect(gulp.hasTask('watch')).toBe(true);
  });
});
