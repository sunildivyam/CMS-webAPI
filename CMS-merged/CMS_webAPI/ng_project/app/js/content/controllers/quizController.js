'use strict';
/*
*   quizController
*   Description
*   quizController controls the Quiz page Level Scope Data.
*/

(function() {
    var quizController = function($rootScope, $scope, $state, $q, appService, contentService, modalService, Quiz, Question, Tag, EntityMapper, Utils, pageMetaTagsService) {
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
                'Reason/s: ' + (appService.getErrorMessage(rejection) || 'Unknown') ,
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
                questions = Utils.decodeQuestions(questions);

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
                        quiz = Utils.decodeQuiz(quiz);
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
                    'Reason/s: ' + (appService.getErrorMessage(rejection) || 'Quiz Not Found.') ,
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
            enocdedQuiz = Utils.encodeQuiz(enocdedQuiz);

            contentService[saveQuizFn](enocdedQuiz).then(function(response) {
                var addedQuiz = new Quiz(response && response.data);
                addedQuiz = Utils.decodeQuiz(addedQuiz);
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
                'Reason/s: ' + appService.getErrorMessage(rejection),
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
            enocdedQuestion = Utils.encodeQuestion(enocdedQuestion);

            contentService.updateQuestion(enocdedQuestion).then(function(response) {
                var addedQuestion = new Question(response && response.data);
                addedQuestion = Utils.decodeQuestion(addedQuestion);
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
                'Reason/s: ' + appService.getErrorMessage(rejection),
                'try Again');
                typeof successCallback === 'function' && successCallback();
            });
        };

        $scope.publishQuiz = function(event, quiz, successCallback) {
            $scope.isLoading = true;
            $scope.loaderMsg = 'Publishing Quiz...'; 
            var encodedQuiz = angular.copy(quiz);
            encodedQuiz = Utils.encodeQuiz(encodedQuiz);

            contentService.publishQuiz(encodedQuiz).then(function(response) {
                $scope.isLoading = false;
                $scope.loaderMsg = ''; 

                var publishedQuiz = new Quiz(response.data);
                publishedQuiz = Utils.decodeQuiz(publishedQuiz);

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
                'Reason/s: ' + appService.getErrorMessage(rejection) ,
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

        function generateQuestionIdsForQuiz(questions) {            
            if (!questions || !questions.length) {
                return '';
            }
            var idsArray = [];
            questions.filter(function(question) {
                idsArray.push(question.questionId);
            });
            return idsArray.join(',');
        }

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams/*, fromState , fromParams*/) {
            pageMetaTagsService.setPageMetaInfo(toState.title, 'Create and Update Quizzes', 'add Quiz,update Quiz,article Quiz,add question,update question');
            if (toState && toState.name && toParams && toParams.id) {
                getQuiz(toParams.id);
            } else {
                getQuiz();
            }
        });
    };

    quizController.$inject = ['$rootScope', '$scope', '$state', '$q', 'appService', 'contentService', 'modalService', 'Quiz', 'Question', 'Tag', 'EntityMapper', 'Utils', 'pageMetaTagsService'];
    module.exports = quizController;
})();
