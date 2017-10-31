'use strict';
(function() {
	var quizView = function($timeout, $location, $interval, CkEditorService, Question, pageTitleService, modalService, appService) {
		var MAX_QUESTION_ATTEMPT_DURATION = 45;
		var originalQuiz;
		return {
			restrict: 'E',
			scope: {
				quiz: '=',
				isLoading: '='
			},
			templateUrl: 'pubcontent/quiz-view.html',
			link: function($scope, element) {
				var $timerProgressBar = $(element).find('.quiz-timer .progress-bar');					
				var quizTimer;
				$scope.score = {
					attemptedQuestionsCount: 0,
					correctAnswersCount: 0,
					secondsLeft: 0,
					inProgress: null,
					progressPercent: 0,
					scorePercent: 0,
					progressStr: getTickStr()
				};
				$scope.$location = $location;
				$scope.pageTitleService = pageTitleService;
				$scope.isQuizTimerCollapsed = true;
				
				$scope.startQuiz = function(event) {
					$scope.quiz = originalQuiz;
					var questionsCount = $scope.quiz.questions.length || 0;
					$scope.score = {
						attemptedQuestionsCount: 0,
						correctAnswersCount: 0,
						secondsLeft: MAX_QUESTION_ATTEMPT_DURATION * questionsCount,
						inProgress: true,
						progressPercent: 0,
						scorePercent: 0
					};

					quizTimer = $interval(function() {
						if ($scope.score.secondsLeft <= 0) {
							$scope.stopQuiz();
						}

						$scope.score.secondsLeft--;
						$scope.score.scorePercent = parseInt(($scope.score.correctAnswersCount/questionsCount) * 100);
						$scope.score.progressPercent = parseInt(($scope.score.attemptedQuestionsCount/questionsCount) * 100);
						$scope.score.progressStr = getTickStr($scope.score.secondsLeft);
						setProgressBarWidth($scope.score.progressPercent);
					}, 1000);
				}
				
				function setProgressBarWidth(progressPercent) {
					if ($timerProgressBar && $timerProgressBar.length) {
						$timerProgressBar.css('width', progressPercent + '%');
					}
				}

				$scope.stopQuiz = function (event) {					
					if (event && $scope.quiz.questions.length !== $scope.score.attemptedQuestionsCount) {
						modalService.alert('md',
						'Quiz Warning',
						'You have not attempted all Questions. Do you want to Finish the Quiz?',
						'Finish Quiz', 'No, Please Take me Back').result.then(function() {
							stopAndShowScore();
						}, function() {
							//
						});
					} else {
						stopAndShowScore();
					}
				}

				function stopAndShowScore() {
					$interval.cancel(quizTimer);
					quizTimer = undefined;
					$scope.score.inProgress = false;

					modalService.alert('md',
					'Quiz Completed',
					'You Socred:' + $scope.score.scorePercent + '%',
					'Re-Start Quiz', 'Review Your Answers').result.then(function() {
						$scope.reStartQuiz();
					}, function() {
						//
					});
				}
				$scope.reStartQuiz = function(event) {
					if ($scope.score.inProgress === false) {						
						$scope.startQuiz();
					}
				};

				$scope.$watch('quiz', function(quiz) {
					if (quiz) {
						setThumbnailUrl();
						if (quiz.description) {
							originalQuiz = angular.copy(quiz);
							$timeout(function() {
								CkEditorService.updateMathJax();
								CkEditorService.updateCodeHighlight($(element));
							}, 100);
						}
					} else {
						setThumbnailUrl(false);
					}
				});

				$scope.onQuestionAttempt = function(question, attemptedAnswer) {
					$scope.score.attemptedQuestionsCount++;
					if (question.answer === attemptedAnswer) {
						$scope.score.correctAnswersCount++;
					}
				}

				$scope.onQuizTimerClick = function(event) {
					$scope.isQuizTimerCollapsed = !$scope.isQuizTimerCollapsed;
				};

				function getTickStr(seconds) {
					if (!seconds || seconds <= 0) {
						return '00:00';
					}
					var mins = parseInt((seconds/60));
					var secs = parseInt((seconds%60));
					return ('- ' + (mins || '00') + ':' + (secs || '00'));
				}

				function setThumbnailUrl(url) {
					if (url === false) {
						$scope.thumbnailUrl = '';
					} else {
						$scope.thumbnailUrl = [appService.getQuizImagesUrl(), $scope.quiz.quizId, $scope.quiz.name].join('/');
					}
				}
			}
		};
	};

	quizView.$inject = ['$timeout', '$location', '$interval', 'CkEditorService', 'Question', 'pageTitleService', 'modalService', 'appService'];
	module.exports = quizView;
})();
