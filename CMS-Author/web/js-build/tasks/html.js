'use strict';
module.exports = function(gulp, config) {
	gulp.task('html', function() {
		gulp.src([config.sourceDir + '/index.html'])
		.pipe(gulp.dest(config.targetDir));
	});
};