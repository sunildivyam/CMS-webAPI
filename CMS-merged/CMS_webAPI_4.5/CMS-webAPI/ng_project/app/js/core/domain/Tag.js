'use strict';
/*
*	Tag
*	Description
*	Tag is Content Tag
*/

(function() {
	var Tag = function() {
		function Tag(raw) {
			if (raw instanceof Object) {
				this.tagId = raw.TagId;
				this.name = raw.Name;
				this.title = raw.Title;
				this.description = raw.Description;

				//Navigation properties
				this.questions = [];	
				this.quizs = [];	
			}
		}

		Tag.prototype = {

		};
		return Tag;
	};

	Tag.$inject = [];
	module.exports = Tag;
})();
