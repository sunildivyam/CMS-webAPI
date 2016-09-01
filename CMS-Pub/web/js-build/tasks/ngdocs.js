'use strict';
module.exports = function(gulp, config) {
	var ngdocs = require('gulp-ngdocs');

	gulp.task('ngdocs', [], function() {
		var ngdocConfig = {
			scripts: [
				'node_modules/angular/angular.min.js',
				'node_modules/angular/angular.min.js.map',
				'target/index.min.js'
			],
			title: 'RAIWEB DOCS',
			html5Mode: false
		};
		gulp.src([config.sourceDir + '**/*.js'])
		.pipe(ngdocs.process(ngdocConfig))
		.pipe(gulp.dest(config.targetDir + '/docs'));
	});
};