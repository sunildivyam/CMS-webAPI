'use strict';
module.exports = function(gulp, config) {
	gulp.task('fonts', function() {
        gulp.src([
            [config.sourceRoot, config.fonts.app].join('/') + '/**/*',
            config.fonts.bootstrap + '/**/*',
            config.fonts.awesome + '/**/*',
            config.fonts.roboto + '/Roboto-Regular.*'])
		.pipe(gulp.dest(config.targetRoot + '/' + config.fonts.app));
	});
};