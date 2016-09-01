'use strict';
module.exports = function(gulp, config) {
	gulp.task('jsondata', function() {
		gulp.src(config.dataDir + '/**/*.json')
		.pipe(gulp.dest(config.targetDir + '/' + config.dataDir));
	});
};