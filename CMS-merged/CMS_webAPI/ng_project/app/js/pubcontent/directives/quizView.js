'use strict';
(function() {
	var quizView = function($timeout, CkEditorService,Question) {
		return {
			restrict: 'E',
			scope: {
				quiz: '=',
				isLoading: '='
			},
			templateUrl: 'pubcontent/quiz-view.html',
			link: function($scope, element) {				
				$scope.$watch('quiz', function(quiz) {
					if (quiz && quiz.description) {
						$timeout(function() {
							CkEditorService.updateMathJax();
							CkEditorService.updateCodeHighlight($(element));
						}, 100);
					}
				});
			}
		};
	};

	quizView.$inject = ['$timeout', 'CkEditorService', 'Question'];
	module.exports = quizView;
})();
