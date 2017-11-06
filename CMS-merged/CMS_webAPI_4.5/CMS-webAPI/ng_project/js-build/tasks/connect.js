'use strict';
module.exports = function(gulp, config) {
	var connect = require('gulp-connect');

	gulp.task('connect', function() {
		return connect.server({
			'root': config.targetRoot,
			'port': 4000
		});
	});
};
