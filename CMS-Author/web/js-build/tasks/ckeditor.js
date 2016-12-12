'use strict';
/*
*	CKEditor loads few resources like js, css, etc. files directly from ckeditor.js (code)
*	So requiring while using browserify does not include them in the package while packaging Rather
* 	these gets downloaded at runtime fro the current CKeditor's folder.
*	So This gulp task copies ckeditor folder "node_modules/ckeditor" and all its contents to target.
*	So when ckeditor.js (packaged) requests resources, they are served from "ckeditor" from target.
*	The current Directory for CKeditor should be set from Project index.js file.
*/
module.exports = function(gulp, config) {
	gulp.task('ckeditor', function() {
		gulp.src([config.ckeditor.src])
		.pipe(gulp.dest(config.targetDir + '/' + config.ckeditor.target + '/'));
	});
};