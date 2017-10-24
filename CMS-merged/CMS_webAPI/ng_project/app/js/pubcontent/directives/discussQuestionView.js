'use strict';
(function() {
	var discussQuestionView = function() {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'pubcontent/discuss-question-view.html',
			link: function() {
				//
			}
		};
	};

	discussQuestionView.$inject = [];
	module.exports = discussQuestionView;
})();
