'use strict';
var ngTemplateCache = require('gulp-angular-templatecache');
var del = require('del');

module.exports = function(gulp, config) {
	gulp.task('ngTemplateCache', function() {
		return gulp.src(config.pagesSourceDir + '/**/*.html')
		.pipe(ngTemplateCache())
		.pipe(gulp.dest(config.sourceDir + '/templates'));
	});

	gulp.task('cleanNgTemplateCache', function() {
		return del(config.sourceDir + '/templates');
	});
};