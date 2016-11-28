'use strict';
var gulp = require('gulp');
var pkg = require('../package.json');
var runSequence = require('run-sequence');

var config = pkg.config;

config.name = pkg.name;
config.main = pkg.main;

require('./tasks/connect')(gulp, config);
require('./tasks/lint')(gulp, config);
require('./tasks/ngTemplateCache')(gulp, config);
require('./tasks/browserify')(gulp, config);
require('./tasks/html')(gulp, config);
require('./tasks/jsondata')(gulp, config);
require('./tasks/fonts')(gulp, config);
require('./tasks/images')(gulp, config);
require('./tasks/less')(gulp, config);
require('./tasks/uglify')(gulp, config);
require('./tasks/cleanCss')(gulp, config);
require('./tasks/clean')(gulp, config);
require('./tasks/ngdocs')(gulp, config);
require('./tasks/webconfig')(gulp, config);

gulp.task('buildjs', function() {
	return runSequence('ngTemplateCache', 'browserify', 'cleanNgTemplateCache');
});

gulp.task('compile', function() {
	return runSequence('lint', 'buildjs', ['html', 'fonts', 'jsondata', 'images', 'less', 'webconfig']);
});

gulp.task('package', function() {
	return runSequence('clean', 'lint', 'ngTemplateCache', 'browserify', 'cleanNgTemplateCache', ['html', 'fonts', 'jsondata', 'images', 'less', 'webconfig'], ['uglify', 'cleanCss'], 'ngdocs');
});

gulp.task('default', ['package']);

gulp.task('watch', function() {
	gulp.watch([config.sourceDir + '/**/*.js', config.sourceDir + '/pages/**/*.html'], function() {
		runSequence('ngTemplateCache', 'browserify', 'cleanNgTemplateCache');
	});
	gulp.watch(config.stylesDir + '/**/*.less', ['less']);
	gulp.watch(config.dataDir + '/**/*.json', ['jsondata']);
	gulp.watch(config.fontsDir + '/**/*', ['fonts']);
	gulp.watch(config.imagesDir + '/**/*', ['images']);
	gulp.watch(config.sourceDir + '/index.html', ['html']);
	gulp.watch(config.sourceDir + '/web.config', ['webconfig']);
});

module.exports = function() {
};

