'use strict';
var less = require('gulp-less');

module.exports = function(gulp, config) {
	gulp.task('less', function() {
		return gulp.src(config.less.sourceFiles)
		.pipe(less({
			'paths': config.less.paths
		}))
		.pipe(gulp.dest(config.targetDir + '/' + config.stylesDir));
	});
};