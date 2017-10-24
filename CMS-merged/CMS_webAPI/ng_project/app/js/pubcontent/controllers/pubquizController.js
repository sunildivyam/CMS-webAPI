'use strict';
/*
*   pubquizController
*   Description
*   pubquizController controls the Quiz page Level Scope Data.
*/

(function() {
    var pubquizController = function($rootScope, $scope, $state, $timeout, appService, pubcontentService, modalService, Quiz, Question, Tag, EntityMapper, metaInformationService, pageTitleService, Utils) {
        $scope.currentQuiz = new Quiz();
       
        function sortQuizQuestions(quiz) {
            if (!quiz.questionIds) {
                return quiz;
            }
            var questionIdsArray = quiz.questionIds.split(',');
            var questions = angular.copy(quiz.questions);
            quiz.questions = [];
            questionIdsArray.filter(function(qId) {
                quiz.questions.push(getQuestionById(qId));
            });

            return quiz;

            function getQuestionById(questionId) {
                var matchedQuestion;
                for (var i =0; i <questions.length; i++){
                    if (questions[i].questionId == questionId) {
                        matchedQuestion = questions[i];
                        break;
                    }
                }
                return matchedQuestion;
            }
        }
        

        function getQuiz(quizId, quizName) {
            $scope.isLoading = true;
            if (quizId && quizName) {
                pubcontentService.getQuiz(quizId, quizName).then(function(response) {
                    var quiz = new Quiz(response && response.data);                    
                    quiz = Utils.decodeQuiz(quiz);

                    quiz = sortQuizQuestions(quiz);
                    $scope.currentQuiz = quiz;
                    $scope.isLoading = false;
                    // Sets Meta information for Page
                    Utils.setMetaInfo(quiz.title, quiz.description, quiz.tags);
                }, function(rejection) {
                    $scope.isLoading = false;
                    modalService.alert('md',
                    'No Quiz found',
                    'Reason/s: ' + (appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') || 'Quiz Not Found.') ,
                    'Go Back').result.then(function() {
                        $state.go('pub.quizs');
                    }, function() {
                        $state.go('pub.quizs');
                    });
                });
            } else {
                //
            }
        }

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams/*, fromState , fromParams*/) {
            if (toState && toState.name) {               
                Utils.getListConfigs().then(function() {
                   
                    if(toState.name === 'pub.quizs.quiz' && toParams.qi && toParams.qn) {
                        Utils.setMetaInfo();
                        $scope.setPageName('pubquizPage');
                        getQuiz(toParams.qi, toParams.qn);
                    } 
                });
            } else {
                //
            }
        });
    };

    pubquizController.$inject = ['$rootScope', '$scope', '$state', '$timeout','appService', 'pubcontentService', 'modalService', 'Quiz', 'Question', 'Tag', 'EntityMapper', 'metaInformationService', 'pageTitleService', 'Utils'];
    module.exports = pubquizController;
})();
