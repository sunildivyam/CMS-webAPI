'use strict';
/*
*	resourcebrowserController
*	Description
*	resourcebrowserController controls the content page Level Scope Data.
*/

(function() {
	var resourcebrowserController = function($rootScope, $scope, $state, $q, appService, resourcebrowserService, modalService, EntityMapper, ContentResource, Category, pageTitleService, contentService, CkEditorService) {
		$scope.resourceToolbarButtons = resourcebrowserService.getToolbarButtons();

		$scope.onResourceUpload = function(event, contentResource, completeCallback) {
			if (contentResource) {
				contentResource.category = $scope.currentCategory;

				resourcebrowserService.uploadContentResource(contentResource).then(function(response) {
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

		$scope.onCategorySelect = function(event, category) {
			$scope.currentCategory = category;
		};

		$scope.onResourceSelect = function(event, resource) {
			$scope.currentResource = resource;
		};

		$scope.onToolbarButtonClick = function(event, btn) {
			if (!btn) {
				return;
			}
			switch(btn.id)
			{
				case 'select':
					CkEditorService.getUrlFromImageBrowser($scope.ckFunctionNumber, resourcebrowserService.getResourcePubUrl($scope.currentResource));
				break;
				case 'upload':
					modalService.showUploadResourceModal($scope.onResourceUpload, 'md').result.then(function() {
						getContentResourcesByCategory($scope.currentCategory);
					}, function() {
						getContentResourcesByCategory($scope.currentCategory);
					});
				break;
				case 'delete':
					console.log('Removed');
				break;
				case 'download':
					console.log('Download');
				break;
			}

		};

		// gets all categories
        function getCategories() {
            var defferedObj = $q.defer();
            contentService.getCategories().then(function(response) {
                $scope.categories = new EntityMapper(Category).toEntities(response.data);
                defferedObj.resolve($scope.categories);
            }, function() {
                $scope.categories = new EntityMapper(Category).toEntities();
                defferedObj.reject($scope.categories);
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

        	$scope.isResourcesLoading = true;
        	resourcebrowserService.getContentResourcesByCategory(categoryId).then(function(response) {
        		$scope.currentResources = processContentResources(new EntityMapper(ContentResource).toEntities(response && response.data));
        		$scope.isResourcesLoading = false;
        		$scope.currentResource = undefined;
        	}, function() {
        		$scope.currentResources = new EntityMapper(ContentResource).toEntities();
        		$scope.isResourcesLoading = false;
        		$scope.currentResource = undefined;
        	});
        }

        $scope.$watch('currentCategory', function(category) {
        	if (!category) {
        		return;
        	}
        	getContentResourcesByCategory(category);
        });

		$scope.$on('$stateChangeSuccess', function(event, toState, toParams/*, fromState , fromParams*/) {
			if (toState && toState.name && toParams) {
				if (toParams.CKEditorFuncNum) {
					$scope.ckFunctionNumber = toParams.CKEditorFuncNum;
				} else {
					$scope.ckFunctionNumber = undefined;
				}
				getCategories().then(function() {
					if ($scope.categories && $scope.categories.length) {
						$scope.currentCategory = $scope.categories[0];
					}
				});
			} else {
				//
			}
		});
	};

	resourcebrowserController.$inject = ['$rootScope', '$scope', '$state', '$q', 'appService', 'resourcebrowserService',  'modalService', 'EntityMapper', 'ContentResource', 'Category', 'pageTitleService', 'contentService', 'CkEditorService'];
	module.exports = resourcebrowserController;
})();
