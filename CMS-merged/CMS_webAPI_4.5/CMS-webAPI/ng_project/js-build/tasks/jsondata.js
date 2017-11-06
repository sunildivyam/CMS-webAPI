'use strict';
module.exports = function(gulp, config) {
	gulp.task('jsondata', function() {
		gulp.src([config.sourceRoot, config.dataDir].join('/') + '/**/*.json')
		.pipe(gulp.dest(config.targetRoot + '/' + config.dataDir));
	});
};