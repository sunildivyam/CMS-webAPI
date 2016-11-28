'use strict';
module.exports = function(gulp, config) {
	var ngdocs = require('gulp-ngdocs');

	gulp.task('ngdocs', [], function() {
		var ngDocsConfig = {
			title: 'CMS Web - Author Documentation',
			startPage: '/api',
			titleLink: '/api',
			html5Mode: false
		};
		gulp.src([config.sourceDir + '/**/*.js'])
		.pipe(ngdocs.process(ngDocsConfig))
		.pipe(gulp.dest(config.targetDir + '/docs'));
	});
};