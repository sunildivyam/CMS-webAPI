'use strict';
/*
*	ResumeSection
*	Description
*	ResumeSection is ResumeSection Container
*/

(function() {
	var ResumeSection = function() {
		function ResumeSection(raw) {
			if (raw instanceof Object) {
				for(var key in raw) {
					this[key] = raw[key];
				}
			} else {
				this.sectionId = 0;
				this.title = '';
				this.content = undefined;
			}
		}

		ResumeSection.prototype = {

		};
		return ResumeSection;
	};

	ResumeSection.$inject = [];
	module.exports = ResumeSection;
})();
