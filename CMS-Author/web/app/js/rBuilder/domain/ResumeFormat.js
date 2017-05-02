'use strict';
/*
*	ResumeFormat
*	Description
*	ResumeFormat is ResumeFormat Container
*/

(function() {
	var ResumeFormat = function() {
		function ResumeFormat(raw) {
			if (raw instanceof Object) {
				for(var key in raw) {
					this[key] = raw[key];
				}
			} else {
				this.resumeFormatId = 0;
				this.title = '';
				this.dropZones = [];
			}
		}

		ResumeFormat.prototype = {

		};
		return ResumeFormat;
	};

	ResumeFormat.$inject = [];
	module.exports = ResumeFormat;
})();
