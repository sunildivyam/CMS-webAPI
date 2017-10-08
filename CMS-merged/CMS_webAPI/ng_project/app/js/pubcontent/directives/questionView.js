'use strict';
(function() {
	var questionView = function($timeout, CkEditorService,Question) {
		return {
			restrict: 'E',
			scope: {
				question: '=',
				serialNumber: '=',
				isInlineMode: '=',
				isLoading: '=',
				onAttemptAnswer: '='
			},
			templateUrl: 'pubcontent/question-view.html',
			link: function($scope, element) {
				var $element = $(element);	
				$scope.attemptedAnswer = '';
				$scope.attemptedAnswerModel = '';

				function showCorrectAnswerSection() {                    
					$timeout(function(){
						$($element.find('.correct-answer-section')).slideDown(500);
					});
                }

				$scope.attemptAnswer = function(event) {
					var that = this;
					if (!this.attemptedAnswer) {
						this.attemptedAnswerModel = '';
						var $answerOption = $(event.currentTarget);
						var $radioBtn = $answerOption.find('input[type="radio"]');
						this.attemptedAnswer = $radioBtn.val();
						$timeout(function() {
							that.attemptedAnswerModel = that.attemptedAnswer;
							$answerOption.addClass($scope.question.answer === that.attemptedAnswer ? 'correct': 'incorrect');	
							showCorrectAnswerSection();
							typeof $scope.onAttemptAnswer === 'function' && $scope.onAttemptAnswer($scope.question, that.attemptedAnswer);
						});											
					}				
				};

				$scope.$watch('question', function(question) {
					if (question && question.description) {
						$timeout(function() {
							CkEditorService.updateMathJax();
							CkEditorService.updateCodeHighlight($(element));
							var $radioBtns = $element.find('input[type="radio"]');
							$radioBtns.click(function(event) {
								event.preventDefault();
								if ($scope.attemptedAnswer) {
									$scope.attemptedAnswerModel = $scope.attemptedAnswer;
								}
							});
						});
					}
				});
			}
		};
	};

	questionView.$inject = ['$timeout', 'CkEditorService', 'Question'];
	module.exports = questionView;
})();
