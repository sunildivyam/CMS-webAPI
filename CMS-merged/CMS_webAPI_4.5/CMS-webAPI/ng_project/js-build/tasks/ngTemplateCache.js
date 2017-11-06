'use strict';
var ngTemplateCache = require('gulp-angular-templatecache');
var del = require('del');

module.exports = function(gulp, config) {
	gulp.task('ngTemplateCache', function() {
        return gulp.src([config.appSrc, config.pagesDir, '**', '*.html'].join('/'))
		.pipe(ngTemplateCache())
		.pipe(gulp.dest(config.appSrc + '/templates'));
	});

	gulp.task('cleanNgTemplateCache', function() {
		return del(config.appSrc + '/templates');
	});
};