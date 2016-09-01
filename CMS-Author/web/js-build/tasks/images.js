'use strict';
module.exports = function(gulp, config) {
	gulp.task('images', function() {
		gulp.src(config.imagesDir + '/**/*')
		.pipe(gulp.dest(config.targetDir + '/' + config.imagesDir));
	});
};