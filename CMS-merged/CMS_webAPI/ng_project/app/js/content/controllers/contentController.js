'use strict';
/*
*   contentController
*   Description
*   contentController controls the content page Level Scope Data.
*/

(function() {
    var contentController = function($rootScope, $scope, $state, $q, appService, contentService, modalService, Content, Tag, Category, EntityMapper, Utils) {
        $scope.currentContent = new Content();

        getTags();
        getCategories();

        function getTags() {
            contentService.getTags().then(function(response) {
                var tags = new EntityMapper(Tag).toEntities(response.data);

                if (tags instanceof Array && tags.length > 0) {
                    $scope.tags = tags;
                } else {
                    modalService.alert('md',
                    'No Content Tags',
                    'No content Tags Available <br> Please add One or more tags',
                    'Add Tags').result.then(function() {
                        $state.go('author.tag');
                    });
                }
            }, function(rejection) {
                modalService.alert('md',
                'Content Tags Load Failed',
                'Reason/s: ' + (appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') || 'Unknown') ,
                'Go to Dashboard').result.then(function() {
                    $state.go('author.dashboard');
                });
            });
        }

        function getCategories() {
            contentService.getCategories().then(function(response) {
                var categories = new EntityMapper(Category).toEntities(response.data);

                if (categories instanceof Array && categories.length > 0) {
                    $scope.categories = categories;
                } else {
                    modalService.alert('md',
                    'No Content Categories',
                    'No content Categories Available <br> Please add One or more categories',
                    'Add Categories').result.then(function() {
                        $state.go('author.category');
                    });
                }
            }, function(rejection) {
                modalService.alert('md',
                'Content Categories Load Failed',
                'Reason/s: ' + (appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') || 'Unknown') ,
                'Go to Dashboard').result.then(function() {
                    $state.go('author.dashboard');
                });
            });
        }

        function getContent(id) {
            $scope.isContentLoadedPromise = $q.defer();
            $scope.isLoading = true;
            $scope.loaderMsg = 'Loading Form...';
            if (id) {                
                var contentId = parseInt(id);
                 $scope.loaderMsg = 'Loading Content...';
                contentService.getContentById(contentId).then(function(response) {                    
                    var content = new Content(response && response.data);                        
                    if (content instanceof Object) {
                        if (content.authorContentId !== contentId) {
                            modalService.alert('md',
                            'Already Exist for Authoring',
                            'You have already taken this for Authoring.',
                            'Open Drafted Content', 'Go to Dashboard').result.then(function() {
                                $state.go('.', {id: content.authorContentId}, {notify: false});
                            }, function() {
                                $state.go('author.dashboard');
                            });
                        }
                        content.description = Utils.decodeContent(content.description);
                        $scope.currentContent = content;
                        $scope.isContentLoadedPromise.resolve($scope.currentContent);
                    } else {
                        $scope.isLoading = false;
                        $scope.loaderMsg = '';
                        $scope.isContentLoadedPromise.resolve($scope.currentContent);
                        modalService.alert('md',
                        'Content Not Found',
                        'Content with Id: ' + id + ' not found',
                        'Go to Dashboard').result.then(function() {
                            $state.go('author.dashboard');
                        });
                    }                    
                }, function(rejection) {
                    $scope.isLoading = false;
                    $scope.loaderMsg = '';
                    modalService.alert('md',
                    'Content loading Failed',
                    'Reason/s: ' + (appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') || 'Content Not Found.') ,
                    'Go to Dashboard').result.then(function() {
                        $state.go('author.dashboard');
                    });
                });
            } else {
                $scope.currentContent = new Content();
                $scope.isContentLoadedPromise.resolve($scope.currentContent);
            }
        }

        function addContent(content, previousAuthorContentId) {
            var defferedObj = $q.defer();

            if (content && content.contentId > 0) {
                content.publishedDate = undefined;
            }
            var enocdedContent = angular.copy(content);
            enocdedContent.description = Utils.encodeContent(enocdedContent.description);
            contentService.addNewContent(enocdedContent, previousAuthorContentId).then(function(response) {
                defferedObj.resolve(response);
            }, function(rejection) {
                defferedObj.reject(rejection);
            });
            return defferedObj.promise;
        }

        function updateContent(content) {
            var defferedObj = $q.defer();
            var enocdedContent = angular.copy(content);
            enocdedContent.description = Utils.encodeContent(enocdedContent.description);

            contentService.updateContent(enocdedContent).then(function(response) {
                defferedObj.resolve(response);
            }, function(rejection) {
                defferedObj.reject(rejection);
            });
            return defferedObj.promise;
        }

        function publishContent(content) {
            var defferedObj = $q.defer();
            var enocdedContent = angular.copy(content);
            enocdedContent.description = Utils.encodeContent(enocdedContent.description);

            contentService.publishContent(enocdedContent).then(function(response) {
                defferedObj.resolve(response);
            }, function(rejection)  {
                defferedObj.reject(rejection);
            });
            return defferedObj.promise;
        }

        $scope.saveContent = function(event, content, previousAuthorContentId) {
            $scope.isLoading = true;
            $scope.loaderMsg = 'Saving Content...';

            addContent(content, previousAuthorContentId).then(function(response) {
                var addedContent = new Content(response && response.data);
                $scope.isLoading = false;
                $scope.loaderMsg = '';
                modalService.alert('md',
                'Content Saved',
                'Content saved successfully',
                'Go to Dashboard',
                'Continue..').result.then(function() {
                    $state.go('author.dashboard');
                }, function() {
                    $state.go('author.content', {id: addedContent.authorContentId});
                });
            }, function(rejection) {
                $scope.isLoading = false;
                $scope.loaderMsg = '';
                modalService.alert('md',
                'Content Saving Failed',
                'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li'),
                'try Again');
            });
        };

        $scope.updateContent = function(event, content) {
            $scope.isLoading = true;
            $scope.loaderMsg = 'Updating Content...';
            updateContent(content).then(function(response) {
                var updatedContent = new Content(response && response.data);
                $scope.isLoading = false;
                $scope.loaderMsg = '';

                modalService.alert('md',
                'Content Update',
                'Content Updated successfully',
                'Go to Dashboard',
                'Continue..').result.then(function() {
                    $state.go('author.dashboard');
                }, function() {
                    $state.go('author.content', {id: updatedContent.authorContentId}, {
                        reload: true
                    });
                });
            }, function(rejection) {
                $scope.isLoading = false;
                $scope.loaderMsg = '';
                modalService.alert('md',
                'Content Update Failed',
                'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') ,
                'try Again');
            });
        };

        $scope.deleteContent = function(event, content) {
            $scope.isLoading = true;
            $scope.loaderMsg = 'Deleting Content...';
            contentService.deleteContent(content && content.authorContentId).then(function(response) {
                var deletedContent = new Content(response && response.data);
                $scope.isLoading = false;
                $scope.loaderMsg = '';
                modalService.alert('md',
                'Content Delete',
                'Following Content Deleted successfully: <br/>' + deletedContent.title + '(' + deletedContent.authorContentId + ')',
                'Go to Dashboard').result.then(function() {
                    $state.go('author.dashboard');
                });
            }, function(rejection) {
                $scope.isLoading = false;
                $scope.loaderMsg = '';
                modalService.alert('md',
                'Content Delete Failed',
                'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') ,
                'try Again');
            });
        };

        $scope.cancelContent = function(event, content) {
            $state.go('.', {id: content && content.authorContentId}, {reload: true});
        };

        $scope.addnewContent = function() {
            $state.go('.', {id: ''}, {reload: true});
        };

        $scope.previewContent = function(event, content) {
            modalService.showContentPreviewModal(content);
        };

        $scope.publishContent = function(event, content) {
            $scope.isLoading = true;
            $scope.loaderMsg = 'Saving Draft...';

            var enocdedContent = angular.copy(content);
            enocdedContent.description = Utils.encodeContent(enocdedContent.description);

            if (!content.authorContentId || content.authorContentId <= 0) {
                addContent(content).then(function(response) {
                    $scope.loaderMsg = "Publishing content...";
                    $scope.currentContent.authorContentId = content.authorContentId = response && response.data && response.data.AuthorContentId;
                    publishContent(content).then(function(response) {
                        //Publish Success
                        onPublishSuccess(response);
                    }, function(rejection) {
                        //Publish Failed
                        onPublishFailed(rejection);
                    });
                }, function(rejection) {
                    // Add Author Content Failed
                    onAddFailed(rejection);
                });
            } else {
                updateContent(content).then(function(/*response*/) {
                    $scope.loaderMsg = "Publishing content...";
                    publishContent(content).then(function(response) {
                        //Publish Success
                        onPublishSuccess(response);
                    }, function(rejection) {
                        //Publish Failed
                        onPublishFailed(rejection);
                    });
                }, function(rejection) {
                    // update Author Content Failed
                    onUpdateFailed(rejection);
                });
            }

            function onAddFailed(rejection) {
                $scope.isLoading = false;
                $scope.loaderMsg = '';
                modalService.alert('md',
                'Saving new Draft Failed. Hence Publishing content Failed.',
                'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') ,
                'try Again');
            }

            function onUpdateFailed(rejection) {
                $scope.isLoading = false;
                $scope.loaderMsg = '';
                modalService.alert('md',
                'Saving Draft Failed. Hence Publishing content Failed.',
                'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') ,
                'try Again');
            }

            function onPublishSuccess(response) {
                $scope.isLoading = false;
                $scope.loaderMsg = '';
                var publishedContent = new Content(response && response.data);

                modalService.alert('md',
                'Content Published',
                'Following Content Published successfully: <br/>' + publishedContent.title + '(' + publishedContent.contentId + ')',
                'Go to Dashboard').result.then(function() {
                    $state.go('author.dashboard');
                });
            }

            function onPublishFailed(rejection) {
                $scope.isLoading = false;
                $scope.loaderMsg = '';
                modalService.alert('md',
                'Content Publish Failed',
                'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') ,
                'try Again');
            }
        };

        $scope.thumbnailUpload = function(event, resourceData, completeCallback) {
            if (resourceData && $scope.currentContent.authorContentId > 0) {
                contentService.uploadContentThumbnail($scope.currentContent.authorContentId, resourceData).then(function() {
                    if (typeof completeCallback === 'function') {
                        completeCallback(true);
                    }
                }, function(rejection) {
                    if (typeof completeCallback === 'function') {
                        completeCallback(false, rejection && rejection.data && rejection.data.Message);
                    }
                });
            } else {
                completeCallback(false, 'Image data or Content Id Missing.');
            }
        };

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams/*, fromState , fromParams*/) {
            if (toState && toState.name && toParams && toParams.id) {
                getContent(toParams.id);
            } else {
                getContent();
            }
        });
    };

    contentController.$inject = ['$rootScope', '$scope', '$state', '$q', 'appService', 'contentService', 'modalService', 'Content', 'Tag', 'Category', 'EntityMapper', 'Utils'];
    module.exports = contentController;
})();
