'use strict';
module.exports = function(gulp, config) {
	gulp.task('webconfig', function() {
		gulp.src([config.sourceDir + '/web.config'])
		.pipe(gulp.dest(config.targetDir));
	});
};