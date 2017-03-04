'use strict';
module.exports = function(gulp, config) {
	gulp.task('fonts', function() {
		gulp.src([config.fonts.app + '/**/*', config.fonts.bootstrap + '/**/*', config.fonts.awesome + '/**/*', config.fonts.roboto + '/Roboto-Regular.*'])
		.pipe(gulp.dest(config.targetDir + '/' + config.fonts.app));
	});
};