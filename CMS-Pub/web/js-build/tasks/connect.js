'use strict';
module.exports = function(gulp, config) {
	var connect = require('gulp-connect');

	gulp.task('connect', function() {
		return connect.server({
			'root': config.targetDir,
			'port': 4000
		});
	});
};
