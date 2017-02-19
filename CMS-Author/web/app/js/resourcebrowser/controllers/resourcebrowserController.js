'use strict';
/*
*   resourcebrowserController
*   Description
*   resourcebrowserController controls the content page Level Scope Data.
*/

(function() {
    var resourcebrowserController = function($rootScope, $scope, $state, $q, appService, resourcebrowserService, modalService, EntityMapper, ContentResource, Category, pageTitleService, contentService, CkEditorService, Utils) {
        $scope.resourceToolbarButtons = resourcebrowserService.getToolbarButtons();
        $scope.dlCategories = {};
        $scope.dlResourceList = {};

        $scope.onResourceUpload = function(event, contentResource, completeCallback) {
            if (contentResource) {
                contentResource.category = $scope.currentCategory;

                resourcebrowserService.uploadContentResource(contentResource).then(function() {
                    if (typeof completeCallback === 'function') {
                        completeCallback(true);
                    }
                }, function(rejection) {
                    if (typeof completeCallback === 'function') {
                        completeCallback(false, rejection && rejection.data && rejection.data.Message);
                    }
                });
            }
        };

        $scope.dlCategories.onItemSelect = function(event, category) {
            $scope.currentCategory = category;
        };

        $scope.dlResourceList.onItemSelect = function(event, resource) {
            $scope.currentResource = resource;
        };

        $scope.onToolbarButtonClick = function(event, btn) {
            if (!btn) {
                return;
            }
            switch(btn.id)
            {
                case 'select':
                    if ($scope.currentResource) {
                        CkEditorService.getUrlFromImageBrowser($scope.ckFunctionNumber, resourcebrowserService.getResourcePubUrl($scope.currentResource));
                    } else {
                        modalService.alert('sm', 'No Resource Selected', 'Please select a resource, then click this Button', 'Ok');
                    }
                break;
                case 'upload':
                    modalService.showUploadResourceModal($scope.onResourceUpload, 'md').result.then(function() {
                        getContentResourcesByCategory($scope.currentCategory);
                    }, function() {
                        getContentResourcesByCategory($scope.currentCategory);
                    });
                break;
                case 'delete':
                    console.log('under dev');
                break;
                case 'preview':
                    if ($scope.currentResource) {
                        modalService.alert('lg',
                            'Preview',
                            '<img src="' + resourcebrowserService.getResourcePubUrl($scope.currentResource) + '"></img>',
                            'Close');
                    } else {
                        modalService.alert('sm', 'No Resource Selected', 'Please select a resource, then click this Button', 'Ok');
                    }
                break;
                case 'download':
                    if ($scope.currentResource) {
                        window.open(resourcebrowserService.getResourcePubUrl($scope.currentResource));
                    } else {
                        modalService.alert('sm', 'No Resource Selected', 'Please select a resource, then click this Button', 'Ok');
                    }
                break;
            }

        };

        // gets all categories
        function getCategories() {
            var defferedObj = $q.defer();
            $scope.dlCategories.isLoading = true;
            $scope.dlCategories = angular.extend(Utils.getListConfigOf('contentResourceCategory'), $scope.dlCategories);

            contentService.getCategories().then(function(response) {
                var categories = new EntityMapper(Category).toEntities(response.data);
                $scope.dlCategories.items = categories;
                defferedObj.resolve(categories);
                $scope.dlCategories.isLoading = false;
            }, function() {
                $scope.categories = new EntityMapper(Category).toEntities();
                defferedObj.reject($scope.categories);
                $scope.dlCategories.isLoading = false;
            });

            return defferedObj.promise;
        }

        function processContentResources(resources) {
            if (resources instanceof Array) {
                resources.filter(function(resource) {
                    if (resource.resourceThumbnail) {
                        resource.resourceThumbnail = 'data:image/' + resource.extension + ';base64,' + resource.resourceThumbnail;
                    }
                });
            }
            return resources;
        }

        function getContentResourcesByCategory(category) {
            var categoryId = 0;
            if (category && category.categoryId > 0) {
                categoryId = category.categoryId;
            }

            $scope.dlResourceList.isLoading = true;
            $scope.dlResourceList = angular.extend(Utils.getListConfigOf('contentResource'), $scope.dlResourceList);

            resourcebrowserService.getContentResourcesByCategory(categoryId).then(function(response) {
                var currentResources = processContentResources(new EntityMapper(ContentResource).toEntities(response && response.data));
                $scope.dlResourceList.items = currentResources;
                $scope.dlResourceList.headerRightLabel = currentResources.length + ' files';
                $scope.currentResource = undefined;
                $scope.dlResourceList.isLoading = false;
            }, function() {
                $scope.dlResourceList.items = new EntityMapper(ContentResource).toEntities();
                $scope.currentResource = undefined;
                $scope.dlResourceList.isLoading = false;
            });
        }

        $scope.$watch('currentCategory', function(category) {
            if (!category) {
                return;
            }
            getContentResourcesByCategory(category);
        });

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams/*, fromState , fromParams*/) {
            if (toState) {
                // Sets Meta information for Page
                Utils.setMetaInfo(toState.title);
            }
            if (toState && toState.name && toParams) {
                Utils.getListConfigs().then(function() {
                    if (toParams.CKEditorFuncNum) {
                        $scope.ckFunctionNumber = toParams.CKEditorFuncNum;
                    } else {
                        $scope.ckFunctionNumber = undefined;
                    }
                    getCategories().then(function() {
                        if ($scope.dlCategories && $scope.dlCategories.items && $scope.dlCategories.items.length) {
                            $scope.currentCategory = $scope.dlCategories.items[0];
                        }
                    });
                });
            } else {
                //
            }
        });
    };

    resourcebrowserController.$inject = ['$rootScope', '$scope', '$state', '$q', 'appService', 'resourcebrowserService',  'modalService', 'EntityMapper', 'ContentResource', 'Category', 'pageTitleService', 'contentService', 'CkEditorService', 'Utils'];
    module.exports = resourcebrowserController;
})();
