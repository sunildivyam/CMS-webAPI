'use strict';
module.exports = function(gulp, config) {
	gulp.task('images', function() {
		gulp.src([config.sourceRoot, config.imagesDir].join('/') + '/**/*')
            .pipe(gulp.dest(config.targetRoot + '/' + config.imagesDir));

        // favicon
        gulp.src([config.appSrc, 'favicon.ico'].join('/'))
            .pipe(gulp.dest(config.targetRoot));
	});
};