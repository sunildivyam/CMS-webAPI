'use strict';
/*
*   quizController
*   Description
*   quizController controls the Quiz page Level Scope Data.
*/

(function() {
    var quizController = function($rootScope, $scope, $state, $q, appService, contentService, modalService, Quiz, Question, Tag, EntityMapper, Utils) {
        $scope.currentQuiz = new Quiz();

        getTags();

        function getTags() {
            contentService.getTags().then(function(response) {
                var tags = new EntityMapper(Tag).toEntities(response.data);

                if (tags instanceof Array && tags.length > 0) {
                    $scope.tags = tags;
                } else {
                    modalService.alert('md',
                    'No Quiz Tags',
                    'No quiz Tags Available <br> Please add One or more tags',
                    'Add Tags').result.then(function() {
                        $state.go('author.tag');
                    });
                }
            }, function(rejection) {
                modalService.alert('md',
                'Quiz Tags Load Failed',
                'Reason/s: ' + (appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') || 'Unknown') ,
                'Go to Dashboard').result.then(function() {
                    $state.go('author.dashboard');
                });
            });
        }

        $scope.getPublishedQuestionsList = function(successCallback) {
            var dlQuestions = {};
            dlQuestions.isLoading = true;
            dlQuestions = angular.extend(Utils.getListConfigOf('question'), dlQuestions);

            contentService.getPublishedQuestions().then(function(response) {
                var questions = new EntityMapper(Question).toEntities(response.data);
                dlQuestions.items = questions;
                dlQuestions.pagingTotalItems = questions.length;
                dlQuestions.headerRightLabel = questions.length + ' results';
                dlQuestions.isLoading = false;
                typeof successCallback === 'function' && successCallback(dlQuestions);
            }, function() {
                dlQuestions.items = new EntityMapper(Question).toEntities([]);
                dlQuestions.pagingTotalItems = 0;
                dlQuestions.headerRightLabel = '0 results';
                dlQuestions.isLoading = false;
                typeof successCallback === 'function' && successCallback(dlQuestions);
            });
        }


        function getQuiz(id) {
            $scope.isQuizLoadedPromise = $q.defer();
            $scope.isLoading = true;
            $scope.loaderMsg = 'Loading Quiz...';
            if (id) {                
                var quizId = parseInt(id);
                 $scope.loaderMsg = 'Loading Quiz...';
                contentService.getQuizById(quizId).then(function(response) {                    
                    var quiz = new Quiz(response && response.data);                        
                    if (quiz instanceof Object) {                        
                        quiz.description = Utils.decodeContent(quiz.description);
                        $scope.currentQuiz = quiz;                        
                    } else {
                        modalService.alert('md',
                        'Quiz Not Found',
                        'Quiz with Id: ' + id + ' not found',
                        'Go to Dashboard').result.then(function() {
                            $state.go('author.dashboard');
                        });
                    } 
                    $scope.isQuizLoadedPromise.resolve($scope.currentQuiz); 
                    $scope.isLoading = false;
                    $scope.loaderMsg = '';                  
                }, function(rejection) {
                    $scope.isLoading = false;
                    $scope.loaderMsg = '';
                    modalService.alert('md',
                    'Quiz loading Failed',
                    'Reason/s: ' + (appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') || 'Quiz Not Found.') ,
                    'Go to Dashboard').result.then(function() {
                        $state.go('author.dashboard');
                    });
                });
            } else {
                $scope.currentQuiz = new Quiz();
                $scope.isQuizLoadedPromise.resolve($scope.currentQuiz);
                $scope.isLoading = false;
                $scope.loaderMsg = '';
            }
        }
        
        function saveQuizContents(quiz, saveQuizFn, successCallback) {
            $scope.isLoading = true;
            $scope.loaderMsg = 'Saving Quiz...';

            var enocdedQuiz = angular.copy(quiz);
            enocdedQuiz.description = Utils.encodeContent(enocdedQuiz.description);

            contentService[saveQuizFn](enocdedQuiz).then(function(response) {
                var addedQuiz = new Quiz(response && response.data);
                $scope.isLoading = false;
                $scope.loaderMsg = '';

                //Reloads only required section of the quiz.
                reLoadQuiz(saveQuizFn, addedQuiz);
                typeof successCallback === 'function' && successCallback(addedQuiz);
                modalService.alert('md',
                'Quiz Saved',
                'Quiz saved successfully',
                'Ok');
            }, function(rejection) {
                $scope.isLoading = false;
                $scope.loaderMsg = '';
                modalService.alert('md',
                'Quiz Saving Failed',
                'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li'),
                'try Again');
            });
        }

        function reLoadQuiz(saveQuizFn, updatedQuiz) {
            $scope.currentQuiz.updatedDate = updatedQuiz.updatedDate;
            $scope.currentQuiz.isLive = updatedQuiz.isLive;

            switch(saveQuizFn) {
                case 'addQuizBasicInfo':                    
                    if (!$scope.currentQuiz.quizId) {                        
                        $scope.currentQuiz.quizId = updatedQuiz.quizId;                        
                        $scope.currentQuiz.createdDate = updatedQuiz.createdDate;
                        $state.go('author.quiz', {id: updatedQuiz.quizId}, {reload: false});
                    }    
                    break;
                case 'updateQuizTags':                    
                    break;
                case 'updateQuizQuestions':
            }
        }

        $scope.saveQuizBasicInfo = function(event, quiz, successCallback) {
            saveQuizContents(quiz, 'addQuizBasicInfo', successCallback);
        };

        $scope.saveQuizTags = function(event, quiz, successCallback) {
            saveQuizContents(quiz, 'updateQuizTags', successCallback);
        };

        $scope.saveQuizQuestions = function(event, quiz, successCallback) {
            quiz.questionIds = generateQuestionIdsForQuiz(quiz.questions);
            saveQuizContents(quiz, 'updateQuizQuestions', successCallback);
        };

        $scope.saveQuizQuestion = function(event, question, successCallback) {
            $scope.isLoading = true;
            $scope.loaderMsg = 'Saving Question...';

            var enocdedQuestion = angular.copy(question);            
            enocdedQuestion.description = Utils.encodeContent(enocdedQuestion.description);
            enocdedQuestion.optionA = Utils.encodeContent(enocdedQuestion.optionA);
            enocdedQuestion.optionB = Utils.encodeContent(enocdedQuestion.optionB);
            enocdedQuestion.optionC = Utils.encodeContent(enocdedQuestion.optionC);
            enocdedQuestion.optionD = Utils.encodeContent(enocdedQuestion.optionD);
            enocdedQuestion.answerDescription = Utils.encodeContent(enocdedQuestion.answerDescription);

            contentService.updateQuestion(enocdedQuestion).then(function(response) {
                var addedQuestion = new Question(response && response.data);
                $scope.isLoading = false;
                $scope.loaderMsg = '';

                modalService.alert('md',
                'Question Saved',
                'Question saved successfully',
                'Ok');
                
                typeof successCallback === 'function' && successCallback(addedQuestion);
            }, function(rejection) {
                $scope.isLoading = false;
                $scope.loaderMsg = '';
                modalService.alert('md',
                'Question Saving Failed',
                'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li'),
                'try Again');
                typeof successCallback === 'function' && successCallback();
            });
        };

        $scope.cancelQuiz = function(event, quiz) {
            $state.go('.', {id: quiz && quiz.quizId}, {reload: true});
        };
        
        $scope.previewQuiz = function(event, quiz) {
            modalService.showQuizPreviewModal(quiz);
        };

        $scope.publishQuiz = function(event, quiz, successCallback) {
            $scope.isLoading = true;
            $scope.loaderMsg = 'Publishing Quiz...';            
            contentService.publishQuiz(quiz).then(function(response) {
                $scope.isLoading = false;
                $scope.loaderMsg = ''; 

                var publishedQuiz = new Quiz(response.data);

                typeof successCallback === 'function' && successCallback(publishedQuiz);

                modalService.alert('md',
                'Quiz Published',
                'Quiz is LIVE now.' ,
                'Continue...');
            }, function(rejection) {
                $scope.isLoading = false;
                $scope.loaderMsg = ''; 
                modalService.alert('md',
                'Quiz Publishing Failed',
                'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') ,
                'try Again');
            });
        };

        $scope.newQuiz = function(event) {
            $state.go('.', {}, {inherit: false});
        };

        $scope.thumbnailUpload = function(event, resourceData, completeCallback) {
            if (resourceData && $scope.currentQuiz.quizId > 0) {
                contentService.uploadQuizThumbnail($scope.currentQuiz.quizId, resourceData).then(function() {
                    if (typeof completeCallback === 'function') {
                        completeCallback(true);
                    }
                }, function(rejection) {
                    if (typeof completeCallback === 'function') {
                        completeCallback(false, rejection && rejection.data && rejection.data.Message);
                    }
                });
            } else {
                completeCallback(false, 'Image data or Quiz Id Missing.');
            }
        };

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams/*, fromState , fromParams*/) {
            if (toState && toState.name && toParams && toParams.id) {
                getQuiz(toParams.id);
            } else {
                getQuiz();
            }
        });
    };

    quizController.$inject = ['$rootScope', '$scope', '$state', '$q', 'appService', 'contentService', 'modalService', 'Quiz', 'Question', 'Tag', 'EntityMapper', 'Utils'];
    module.exports = quizController;
})();
