'use strict';
(function() {
    var contentForm = function(modalService, Utils, appService, $timeout, $q) {
        return {
            restrict: 'E',
            scope: {
                content: '=',
                tags: '=',
                categories: '=',
                onSave: '=',
                onDelete: '=',
                onUpdate: '=',
                onCancel: '=',
                onAddnew: '=',
                onPreview: '=',
                onPublish: '=',
                onThumbnailUpload: '=',
                isLoading: '=',
                loaderMsg: '=',
                isContentLoadedPromise: '=',
                onLoadComplete: '='
            },
            templateUrl: 'content/content-form.html',
            link: function($scope, element) {
                $scope.thumbnailUrl = '';

                $scope.shortDescriptionEditorReadyPromise = $q.defer();
                $scope.descriptionEditorReadyPromise = $q.defer();
                
                $q.all([$scope.shortDescriptionEditorReadyPromise.promise,
                    $scope.descriptionEditorReadyPromise.promise,
                    $scope.isContentLoadedPromise.promise
                ]).then(function(responses) {
                    $timeout(function(){
                        typeof $scope.onLoadComplete === 'function' && $scope.onLoadComplete();
                    });                    
                }, function() {
                    typeof $scope.onLoadComplete === 'function' && $scope.onLoadComplete();
                    modalService.alert('md',
                    'Unknown Error Loading Content',
                    'Unknown Error has occured, loading Content',
                    'Press F5 to refresh the Page').result.then(function() {
                        //
                    }, function() {
                        //
                    });
                });

                $scope.$watch('content.title', function(newValue) {
                    if (newValue) $scope.content.name = Utils.parseStringExt(newValue, '-');
                });

                $scope.addThumbnail = function() {
                    setThumbnailUrl(false);
                    modalService.showUploadResourceModal($scope.onThumbnailUpload, 'md').result.then(function() {
                        setThumbnailUrl();
                    }, function() {
                        setThumbnailUrl();
                    });
                };

                $scope.save = function(event) {
                    if ($scope.contentForm.$valid === true) {
                        if (typeof $scope.onSave === 'function') {
                            $scope.onSave(event, $scope.content, $scope.previousAuthorContentId);
                        }
                    } else {
                        //
                    }
                };

                $scope.update = function(event) {
                    if ($scope.contentForm.$valid === true) {
                        if (typeof $scope.onUpdate === 'function') {
                            $scope.onUpdate(event, $scope.content);
                        }
                    } else {
                        //
                    }
                };

                $scope.delete = function(event) {
                    modalService.alert('md',
                    'Delete Content',
                    'Content will be deleted permanently and can not be recovered. <br/> Do you want to proceed?',
                    'Yes',
                    'No').result.then(function() {
                        if (typeof $scope.onDelete === 'function') {
                            $scope.onDelete(event, $scope.content);
                        }
                    }, function() {
                        //
                    });
                };

                $scope.cancel = function(event) {
                    modalService.alert('md',
                    'Cancel Content',
                    'This will clear the unsaved data. <br/> Do you want to proceed?',
                    'Yes',
                    'No').result.then(function() {
                        if (typeof $scope.onCancel === 'function') {
                            $scope.onCancel(event, $scope.content);
                        } else {
                            $scope.content = {};
                        }
                    }, function() {
                        //
                    });
                };

                $scope.addnew = function(event) {
                    modalService.alert('md',
                    'Add New Content',
                    'Any unsaved data will be lost. <br/> Do you want to proceed?',
                    'Yes',
                    'No').result.then(function() {
                        if (typeof $scope.onAddnew === 'function') {
                            $scope.onAddnew(event, $scope.content);
                        } else {
                            $scope.content = {};
                        }
                    }, function() {
                        //
                    });
                };

                $scope.preview = function(event) {
                    if (typeof $scope.onPreview === 'function') {
                        var contentToPreview = {};
                        angular.copy($scope.content, contentToPreview);
                        contentToPreview.authorContentId = contentToPreview.authorContentId || $scope.previousAuthorContentId;
                        $scope.onPreview(event, contentToPreview);
                    } else {
                        //
                    }
                };

                $scope.publish = function(event) {
                    if ($scope.isReadyToPublish() === true ) {
                        modalService.alert('md',
                        'Publish Content',
                        'This will publish content to Live Site. Do you want to continue?',
                        'Yes',
                        'No').result.then(function() {
                            if (typeof $scope.onPublish === 'function') {
                                $scope.onPublish(event, $scope.content);
                            } else {
                                //
                            }
                        }, function() {
                            //
                        });
                    } else {
                        modalService.alert('md',
                        'Warning: Publish Content',
                        'This Content is not ready for Publishing yet. Please complete all the fileds and verify all contents again?',
                        'Ok');
                    }
                };

                $scope.isReadyToPublish = function() {
                    var content = $scope.content;

                    if(content instanceof Object) {
                        if (!content.title ||
                            !content.shortDescription ||
                            (!content.category || !content.category.categoryId) ||
                            (!content.tags || !content.tags.length) ||
                            !content.description) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return false;
                    }
                };

                $scope.$watch('content', function(newContent) {
                    if (newContent) {
                        if (newContent.contentId > 0 && typeof newContent.publishedDate !== 'undefined') {
                            $scope.previousPublishedDate = newContent.publishedDate;
                            $scope.previousAuthorContentId = newContent.authorContentId; 
                            newContent.publishedDate = undefined;
                            newContent.authorContentId = undefined;
                        } else {
                            $scope.previousAuthorContentId = undefined;
                            $scope.previousPublishedDate = undefined;
                        } 
                        if (newContent.authorContentId > 0) {
                            setThumbnailUrl();                           
                        } else {
                            setThumbnailUrl(false);
                        }                        
                    }                   
                });

                function setThumbnailUrl(url) {
                    if (url === false) {
                        $scope.thumbnailUrl = '';
                    } else {                       
                        $scope.thumbnailUrl = [appService.getAuthorArticleImagesUrl(), ($scope.content.authorContentId || $scope.previousAuthorContentId) + '?cb=' + (new Date()).getTime()].join('/');               
                    }
                }

                $scope.showAddTags = function(event) {
                    event.preventDefault();
                    showAddNewTagsForm(!$scope.isAddNewTagsVisible);
                };


                $scope.onAddNewTagsSave = function(event, tags) {
                    if (!$scope.content.tags) $scope.content.tags = [];
                    $scope.tags = $scope.tags.concat(tags);
                    $scope.content.tags = $scope.content.tags.concat(tags);
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
            }
        };
    };

    contentForm.$inject = ['modalService', 'Utils', 'appService', '$timeout', '$q'];
    module.exports = contentForm;
})();
