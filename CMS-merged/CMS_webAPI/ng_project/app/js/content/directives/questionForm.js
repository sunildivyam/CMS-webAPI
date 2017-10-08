'use strict';
(function() {
    var questionForm = function(modalService, $timeout, $q, $compile) {
        return {
            restrict: 'E',
            scope: {
                question: '=',
                serialNumber: '=',
                tags: '=',
                isEditMode: '=',
                onSave: '=',
                enableSave: '=',
                onCancel: '=',
                onPreview: '=',
                isLoading: '=',
                loaderMsg: '=',
                isQuestionLoadedPromise: '='
            },
            templateUrl: 'content/question-form.html',
            link: function($scope, element) {
                var $element = $(element);

                $scope.descriptionEditorReadyPromise = $q.defer();                
                $q.all([$scope.descriptionEditorReadyPromise.promise
                ]).then(function(responses) {
                    $timeout(function(){
                        $scope.isLoading = false;
                    });                    
                }, function() {
                    $scope.isLoading = false;
                    modalService.alert('md',
                    'Unknown Error Loading Question',
                    'Unknown Error has occured, loading Question',
                    'Press F5 to refresh the Page').result.then(function() {
                        //
                    }, function() {
                        //
                    });
                });

                $scope.save = function(event) {
                    if ($scope.questionForm.$valid === true) {
                        if (typeof $scope.onSave === 'function') {
                            $scope.onSave(event, $scope.question);
                        }
                    } else {
                        //
                    }
                };

                $scope.cancel = function(event) {
                    modalService.alert('md',
                    'Cancel Question',
                    'This will clear the unsaved data. <br/> Do you want to proceed?',
                    'Yes',
                    'No').result.then(function() {
                        if (typeof $scope.onCancel === 'function') {
                            $scope.onCancel(event, $scope.question);
                        } else {
                            $scope.question = {};
                        }
                    }, function() {
                        //
                    });
                };
                
                function toggleSection(sectionElSelector, showSection) {
                    var $sectionEl = $($element.find(sectionElSelector));
                    if (showSection) {
                        $sectionEl.slideDown(500);
                    } else {
                        $sectionEl.slideUp(500);
                    }                    
                }

                $scope.preview = function(event, isEditMode) {                    
                    if (typeof $scope.onPreview === 'function') {
                        var questionToPreview = {};
                        angular.copy($scope.question, questionToPreview);
                        
                        $scope.onPreview(event, questionToPreview);
                    } else {
                        $scope.isEditMode = !isEditMode;                                                                   
                    }
                };

                $scope.$watch('isEditMode', function(isEditMode) {
                    toggleSection('.question-edit-mode', isEditMode);    
                    toggleSection('.question-preview-mode', !isEditMode); 
                });
                
                $scope.showAddTags = function(event) {
                    event.preventDefault();
                    showAddNewTagsForm(!$scope.isAddNewTagsVisible);
                };


                $scope.onAddNewTagsSave = function(event, tags) {
                    if (!$scope.question.tags) $scope.question.tags = [];
                    $scope.tags = $scope.tags.concat(tags);
                    $scope.question.tags = $scope.question.tags.concat(tags);
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
            }
        };
    };

    questionForm.$inject = ['modalService', '$timeout', '$q', '$compile'];
    module.exports = questionForm;
})();
