'use strict';
/*
	Gulp task "lint" uses es-lint for linting the javascript code files.
	It will include all js and json files from following folders:
	* app/** /*.{js, json}
	.eslintrc.json file can be used to override default es-lint configs and rules
*/
var eslint = require('gulp-eslint');

module.exports = function(gulp, config) {
	gulp.task('lint', function() {
		gulp.src([config.sourceDir + '/**/*.{js, json}', '!node_modules/**','!' + config.sourceDir + '/templates/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
	});
};