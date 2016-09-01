'use strict';
module.exports = function(gulp, config) {
	gulp.task('fonts', function() {
		gulp.src([config.fontsDir + '/**/*', config.bootstrapFontsDir + '/**/*'])
		.pipe(gulp.dest(config.targetDir + '/' + config.fontsDir));
	});
};