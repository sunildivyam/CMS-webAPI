'use strict';
(function() {
    var quizForm = function(modalService, Utils, appService, $timeout, $q, $compile, Question) {
        var RECOMMENDED_QUESTION_QTY = 10;
        var quizValidationRules = [
            {
                id: 'title',
                status: 'danger',
                message: {                
                    success: 'Quiz Title is present',
                    danger: 'Quiz Title is mandatory'
                }
            },
            {
                id: 'description',
                status: 'danger',
                message: {                
                    success: 'Quiz Description is present',
                    danger: 'Quiz Description is mandatory'
                }
                    
            },
            {
                id: 'tags',
                status: 'danger',
                message: {                
                    success: 'Quiz Tags are present',
                    danger: 'Quiz Tags are mandatory. Please apply one or more Tags.'
                }
            },
            {
                id: 'questions',
                status: 'danger',
                message: {                
                    success: 'Quiz Questions are present',
                    danger: 'Quiz Questions are mandatory, Add one or more Questions.',
                    warning: 'You have added less than ' + RECOMMENDED_QUESTION_QTY +  ' Questions to your Quiz. Atleast ' + RECOMMENDED_QUESTION_QTY +  ' questions in a Quiz are recommended.'
                }
            },
            {
                id: 'savebasicinfo',
                status: 'danger',
                message: {                
                    success: 'No Pending Unsaved Data on <strong>"Quiz Basic Info"</strong> Tab.',
                    danger: '<strong>"Quiz Basic Info"</strong> Tab has pending Unsaved data.'
                }
            },
            {
                id: 'savetags',
                status: 'danger',
                message: {                
                    success: 'No Pending Unsaved Data on <strong>"Quiz Tags"</strong> Tab.',
                    danger: '<strong>"Quiz Tags"</strong> Tab has pending Unsaved data.'
                }
            },
            {
                id: 'savequestions',
                status: 'danger',
                message: {                
                    success: 'No Pending Unsaved Data on <strong>"Quiz Questions"</strong> Tab.',
                    danger: '<strong>"Quiz Questions"</strong> Tab has pending Unsaved data.'
                }
            }
        ];

        return {
            restrict: 'E',
            scope: {
                quiz: '=',
                tags: '=',
                onSaveBasicInfo: '=',
                onSaveTags: '=',
                onSaveQuestions: '=',
                onSaveQuestion: '=',
                onPreview: '=',
                onPublish: '=',
                onNewQuiz: '=',
                onThumbnailUpload: '=',
                onGetQuestionsLib: '=',
                isLoading: '=',
                loaderMsg: '=',
                isQuizLoadedPromise: '='
            },
            templateUrl: 'content/quiz-form.html',
            link: function($scope, element) {
                var $element = $(element);                

                // List of Questions to Add to Quiz from Multiple Checkbox List
                $scope.selectedQuestionsList = [];

                $scope.thumbnailUrl = '';

                $scope.descriptionEditorReadyPromise = $q.defer();
                
                $q.all([$scope.descriptionEditorReadyPromise.promise,
                    $scope.isQuizLoadedPromise.promise
                ]).then(function(responses) {
                    $timeout(function(){
                        $scope.isLoading = false;
                    });                    
                }, function() {
                    $scope.isLoading = false;
                    modalService.alert('md',
                    'Unknown Error Loading Quiz',
                    'Unknown Error has occured, loading Quiz',
                    'Press F5 to refresh the Page').result.then(function() {
                        //
                    }, function() {
                        //
                    });
                });

                $scope.$watch('quiz.title', function(newValue) {
                    if (newValue) $scope.quiz.name = Utils.parseStringExt(newValue, '-');
                });

                $scope.addThumbnail = function() {
                    setThumbnailUrl(false);
                    modalService.showUploadResourceModal($scope.onThumbnailUpload, 'md').result.then(function() {
                        setThumbnailUrl();
                    }, function() {
                        setThumbnailUrl();
                    });
                };

                $scope.saveBasicInfo = function(event) {
                    var that = this;
                    if (this.quizFormBasicInfo.$valid === true) {
                        if (typeof $scope.onSaveBasicInfo === 'function') {
                            $scope.onSaveBasicInfo(event, $scope.quiz, function(quiz) {
                                that.quizFormBasicInfo.$dirty = false;
                                $scope.quiz.updatedDate = quiz.updatedDate;
                                $scope.quiz.isLive = quiz.isLive;
                            });
                        }
                    } else {
                        //
                    }
                };

                $scope.saveTags = function(event) {
                    var that = this;
                    if (this.quizFormTags.$valid === true) {
                        if (typeof $scope.onSaveTags === 'function') {
                            $scope.onSaveTags(event, $scope.quiz, function(quiz) {
                                that.quizFormTags.$dirty = false;
                                $scope.quiz.updatedDate = quiz.updatedDate;
                                $scope.quiz.isLive = quiz.isLive;
                            });
                        }
                    } else {
                        //
                    }
                };

                $scope.saveQuestions = function(event) {
                    var that = this;
                    modalService.alert('md',
                    'Save Quiz Questions',
                    'This will Save, Added Questions Only. Any Changes pending as New Question, will not be Saved.',
                    'Save',
                    'Back').result.then(function() {
                        if (typeof $scope.onSaveQuestions === 'function') {
                            $scope.onSaveQuestions(event, $scope.quiz, function(quiz) {
                                that.quizFormQuestions.$dirty = false;
                                $scope.quiz.updatedDate = quiz.updatedDate;
                                $scope.quiz.isLive = quiz.isLive;
                                $scope.quiz.questionIds = quiz.questionIds;
                                
                                // Sort Quiz Questions
                                if ($scope.quiz.questionIds != quiz.questionIds) {
                                    sortQuizQuestions(quiz.questionIds);
                                }                                
                            });
                        }
                    }, function() {
                        //
                    });
                };
               
                $scope.saveQuestion = function(event, question) {
                    if (typeof $scope.onSaveQuestion === 'function') {
                        $scope.onSaveQuestion(event, question);
                    }
                };

                $scope.preview = function(event) {
                    if (typeof $scope.onPreview === 'function') {
                        var quizToPreview = {};
                        angular.copy($scope.quiz, quizToPreview);
                        
                        $scope.onPreview(event, quizToPreview);
                    } else {
                        //
                    }
                };

                $scope.publish = function(event) {
                    if ($scope.isReadyToPublishQuiz === true ) {
                        modalService.alert('md',
                        'Publish Quiz',
                        'This will publish quiz to Live Site. Do you want to continue?',
                        'Yes',
                        'No').result.then(function() {
                            if (typeof $scope.onPublish === 'function') {
                                $scope.onPublish(event, $scope.quiz, function(quiz) {
                                    $scope.quiz.isLive = quiz.isLive;
                                });
                            } else {
                                //
                            }
                        }, function() {
                            //
                        });
                    } else {
                        modalService.alert('md',
                        'Warning: Publish Quiz',
                        'This Quiz is not ready for Publishing yet. Please complete all the fileds and verify all contents again?',
                        'Ok');
                    }
                };
                
                function setThumbnailUrl(url) {
                    if (url === false) {
                        $scope.thumbnailUrl = '';
                    } else {                       
                        $scope.thumbnailUrl = [appService.getQuizImagesUrl(), $scope.quiz.quizId + '?cb=' + (new Date()).getTime()].join('/');               
                    }
                }

                $scope.showAddTags = function(event) {
                    event.preventDefault();
                    showAddNewTagsForm(!$scope.isAddNewTagsVisible);
                };


                $scope.onAddNewTagsSave = function(event, tags) {
                    if (!$scope.quiz.tags) $scope.quiz.tags = [];
                    $scope.tags = $scope.tags.concat(tags);
                    $scope.quiz.tags = $scope.quiz.tags.concat(tags);
                    showAddNewTagsForm(false);
                };

                $scope.onAddNewTagsCancel = function(/* event, tags */) {
                    showAddNewTagsForm(false);
                };

                function showAddNewTagsForm(status) {
                    var $element = $(element);
                    if (status === true) {
                        $scope.isAddNewTagsVisible = true;
                        $timeout(function(){
                            $($element.find('.add-tags-form')).slideDown(500);
                        });
                    } else {
                        $($element.find('.add-tags-form')).slideUp(500, function() {
                            $scope.isAddNewTagsVisible = false;
                        });
                    }
                }

                function toggleSection(sectionElSelector, showSection) {
                    var $sectionEl = $($element.find(sectionElSelector));
                    if (showSection) {
                        $sectionEl.slideDown(500);
                    } else {
                        $sectionEl.slideUp(500);
                    }                    
                }

                $scope.addnewQuestion = function(event) {
                    if (!$scope.isNewQuestion) {
                        if (!$scope.newQuestion) {
                            $scope.newQuestion = new Question();
                        }
                        $scope.isNewQuestion = true; 
                        $scope.isQuestionsFromList = false; 
                        toggleSection('.new-question',$scope.isNewQuestion); 
                        toggleSection('.new-questions-from-list',$scope.isQuestionsFromList); 
                    }                 
                };


                $scope.addQuestionFromList = function(event) {
                    if (!$scope.isQuestionsFromList) {
                        $scope.isNewQuestion = false;
                        $scope.isQuestionsFromList = true;
                        toggleSection('.new-question',$scope.isNewQuestion); 
                        toggleSection('.new-questions-from-list',$scope.isQuestionsFromList); 

                        if (!$scope.dlQuestions || !$scope.dlQuestions.items || !$scope.dlQuestions.items.length) {
                            $scope.refreshQuestionsList(event);
                        } else {
                            $scope.dlQuestions.items = getIntersectedQuestions($scope.dlQuestions.items);
                        }
                    }

                    // Show Question List and alow user to Select Multiple Questions
                };

                $scope.addQuestionToQuiz = function(event) {
                    if (isQuestionValid($scope.newQuestion) === true) {
                        if (typeof $scope.onSaveQuestion === 'function') {
                            $scope.onSaveQuestion(event, $scope.newQuestion, function(addedQuestion) {
                                if (addedQuestion) {
                                    $scope.quiz.questions.push(addedQuestion); 
                                    $scope.newQuestion = new Question();                       
                                    $scope.isNewQuestion = false;
                                    toggleSection('.new-question',$scope.isNewQuestion);
                                }
                            });
                        }                         
                    } else {
                        modalService.alert('md',
                        'Question Validation',
                        'You should complete the question, before adding it to Quiz.',
                        'Ok');
                    }
                }

                $scope.addSelectedQuestionsToQuiz = function(event) {
                    $scope.isQuestionsFromList = false;
                    toggleSection('.new-questions-from-list',$scope.isQuestionsFromList); 

                    //Add Questions to Quiz
                    $scope.selectedQuestionsList.filter(function(question) {
                        $scope.quiz.questions.push(question);
                    });
                    $scope.selectedQuestionsList = [];
                    $scope.dlQuestions.items = getIntersectedQuestions($scope.dlQuestions.items);
                };


                $scope.extendInput = function(event, targetElementSelector) {
                    var $targetInputEl = $(element).find(targetElementSelector);
                    if ($targetInputEl && $targetInputEl.length) {
                        var isExtended = typeof $targetInputEl.attr('ck') !== 'undefined';
                        if (isExtended === true) {
                            if (CKEDITOR && CKEDITOR.instances) {
                                var ckInstance = CKEDITOR.instances[$targetInputEl.attr('id')];
                                ckInstance && ckInstance.destroy();
                            }
                            $targetInputEl.removeAttr('ck');
                        } else {
                            $targetInputEl.attr('ck', '');
                            $compile($targetInputEl)($scope);
                        }
                    }
                }

                function removeQuizQuestion(index) {
                    if ($scope.quiz && $scope.quiz.questions && $scope.quiz.questions.length > index) {
                        $scope.quiz.questions.splice(index, 1);
                    }
                }

                $scope.removeQuestionFromQuiz = function (event, index) {
                    modalService.alert('md',
                    'Remove Quiz Question',
                    'This will discard any Unsaved Question data. Do you want to continue...',
                    'Continue', 'Cancel').result.then(function() {
                        removeQuizQuestion(index);
                    }, function() {
                        //
                    });
                }

                $scope.moveQuestionInQuiz = function (event, index, isUp) {
                    if (!$scope.quiz.questions || !$scope.quiz.questions.length) {
                        return;
                    }

                    var minIndex = 0;
                    var maxIndex = ($scope.quiz.questions && $scope.quiz.questions.length -1) || 0;
                    var sourceQuestion = $scope.quiz.questions[index];
                    var newIndex;
                    $scope.quiz.questions.splice(index, 1);
                    if (isUp) {                        
                        if (index === minIndex) {                            
                            $scope.quiz.questions.push(sourceQuestion);
                        } else {                            
                            $scope.quiz.questions.splice(--index, 0, sourceQuestion);
                        }
                    } else {
                        if (index === maxIndex) {
                            $scope.quiz.questions.splice(minIndex, 0, sourceQuestion);
                        } else {                            
                            $scope.quiz.questions.splice(++index, 0, sourceQuestion);
                        }
                    }
                }

                function isQuestionValid(question) {
                    if (!question || !question.description || !question.optionA || !question.optionB || !question.description.trim() || !question.optionA.trim() || !question.optionB.trim()) {
                        return false;
                    }
        
                    return true;
                }                

                $scope.onPublishQuizSelect = function(event) {
                    // Check for Quiz Validation Rules
                    $scope.publishRules = createQuizValidationRuleGraph($scope.quiz, this);
                };

                function createQuizValidationRuleGraph(quiz, quizScope) {
                    $scope.isReadyToPublishQuiz = false;
                    var isReadyToPublishQuiz = true;
                    var publishRules = angular.copy(quizValidationRules);
                    publishRules.filter(function(rule) {
                        switch(rule.id) {
                            case 'title':
                                if (quiz.title && quiz.title.trim()) {
                                    rule.status = 'success';                                    
                                } else {
                                    isReadyToPublishQuiz = false;
                                }
                            break;
                            case 'description':
                                if (quiz.description && quiz.description.trim()) {
                                    rule.status = 'success';                                    
                                } else {
                                    isReadyToPublishQuiz = false;
                                }
                            break;
                            case 'tags':
                                if (quiz.tags && quiz.tags.length) {
                                    rule.status = 'success';                                    
                                } else {
                                    isReadyToPublishQuiz = false;
                                }
                            break;
                            case 'questions':
                                if (quiz.questions && quiz.questions.length) {
                                    rule.status = 'success';
                                    if (quiz.questions.length < RECOMMENDED_QUESTION_QTY) {
                                        rule.status = 'warning';
                                    }                                 
                                } else {
                                    isReadyToPublishQuiz = false;
                                }
                            break;
                            case 'savebasicinfo':
                                if (quizScope.quizFormBasicInfo.$dirty === false) {
                                    rule.status = 'success';                                                                    
                                } else {
                                    isReadyToPublishQuiz = false;
                                }
                            break;
                            case 'savetags':
                                if (quizScope.quizFormTags.$dirty === false) {
                                    rule.status = 'success';                                                                    
                                } else {
                                    isReadyToPublishQuiz = false;
                                }
                            break;
                            case 'savequestions':
                                if (quizScope.quizFormQuestions.$dirty === false) {
                                    rule.status = 'success';                                                                    
                                } else {
                                    isReadyToPublishQuiz = false;
                                }
                            break;
                        }
                    });

                    $scope.isReadyToPublishQuiz = isReadyToPublishQuiz;
                    return publishRules;
                }

                $scope.refreshQuestionsList = function(event) {
                    if (typeof $scope.onGetQuestionsLib === 'function') {
                        $scope.onGetQuestionsLib(function(dlQuestions) {
                            $scope.dlQuestions = dlQuestions;
                            $scope.dlQuestions.items = getIntersectedQuestions(dlQuestions.items);

                            $scope.selectedQuestionsList = []; //reinitialize Selected List

                            $scope.dlQuestions.onItemSelect = function(event, question, isSelected) {
                                if (isSelected === true) {
                                    var isExist = false;
                                    $scope.selectedQuestionsList.filter(function(selectedQuestion) {
                                        if (selectedQuestion.questionId === question.questionId) {
                                            isExist = true;
                                        }
                                    });
                                    !isExist && $scope.selectedQuestionsList.push(question);
                                } else {
                                    $scope.selectedQuestionsList = $scope.selectedQuestionsList.filter(function(selectedQuestion) {
                                        if (selectedQuestion.questionId !== question.questionId) {
                                            return selectedQuestion;
                                        }
                                    });
                                }
                            };
                        });
                    }
                };
                
                function getIntersectedQuestions(questions) {
                    var intersectedQuestions = [];
                    if (questions instanceof Array) {
                        intersectedQuestions = questions.filter(function(question) {
                            var matchedQuestion;
                            $scope.quiz.questions.filter(function(quizQuestion) {
                                if(question.questionId === quizQuestion.questionId) {
                                    if (!matchedQuestion) matchedQuestion = question;
                                }
                            });
                            if (!matchedQuestion) {
                                return question;
                            }
                        });
                    }
                    return intersectedQuestions;
                }

                $scope.$watch('quiz', function(quiz) {
                    if (quiz.quizId) {
                        setThumbnailUrl();
                        sortQuizQuestions(quiz.questionIds);
                    } else {
                        setThumbnailUrl(false);
                    }
                });

                function sortQuizQuestions(questionIds) {
                    if (!questionIds) {
                        return;
                    }
                    var questionIdsArray = questionIds.split(',');
                    var questions = angular.copy($scope.quiz.questions);
                    $scope.quiz.questions = [];
                    questionIdsArray.filter(function(qId) {
                        $scope.quiz.questions.push(getQuestionById(qId));
                    });

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

                $scope.addNewQuiz = function(event) {
                    modalService.alert('md',
                    'New Quiz',
                    'You are already authoring Quiz:<br>"' + $scope.quiz.title + '"<p class="text-danger">This will discard any Unsaved Quiz data.</p> Do you want to continue?',
                    'Continue...', 'Cancel').result.then(function() {
                        typeof $scope.onNewQuiz === 'function' && $scope.onNewQuiz();
                    }, function() {
                        //
                    });
                }
            }
        };
    };

    quizForm.$inject = ['modalService', 'Utils', 'appService', '$timeout', '$q', '$compile', 'Question'];
    module.exports = quizForm;
})();
