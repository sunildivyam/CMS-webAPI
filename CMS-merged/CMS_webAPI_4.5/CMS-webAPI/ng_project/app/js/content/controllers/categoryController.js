'use strict';
/*
*	categoryController
*	Description
*	categoryController controls the content page Level Scope Data.
*/

(function() {
	var categoryController = function($rootScope, $scope, $state, appService, contentService, modalService, Category, pageMetaTagsService) {
		$scope.currentCategory = new Category();

		function getCategory(id) {
			if (id) {
				$scope.isLoading = true;
				$scope.loaderMsg = 'Loading Category...';
				var categoryId = parseInt(id);
				contentService.getCategoryById(categoryId).then(function(response) {
					$scope.isLoading = false;
					$scope.loaderMsg = '';
					var category = new Category(response && response.data);
					if (category instanceof Object) {
						$scope.currentCategory = category;
					} else {
						modalService.alert('md',
						'Category Not Found',
						'Category with Id: ' + id + ' not found',
						'Go to Dashboard').result.then(function() {
							$state.go('author.dashboard');
						});
					}
				}, function(rejection) {
					$scope.isLoading = false;
					$scope.loaderMsg = '';
					modalService.alert('md',
					'Category loading Failed',
					'Reason/s: ' + (appService.getErrorMessage(rejection) || 'Category Not Found.') ,
					'Go to Dashboard').result.then(function() {
						$state.go('author.dashboard');
					});
				});
			}
		}

		$scope.saveCategory = function(event, category) {
			$scope.isLoading = true;
			$scope.loaderMsg = 'Saving Category...';
			contentService.addNewCategory(category).then(function(response) {
				var addedCategory = new Category(response && response.data);
				$scope.isLoading = false;
				$scope.loaderMsg = '';
				modalService.alert('md',
				'Category Saved',
				'Category saved successfully',
				'Go to Dashboard',
				'Continue..').result.then(function() {
					$state.go('author.dashboard');
				}, function() {
					$state.go('author.category', {id: addedCategory.categoryId});
				});
			}, function(rejection) {
				$scope.isLoading = false;
				$scope.loaderMsg = '';
				modalService.alert('md',
				'Category Saving Failed',
				'Reason/s: ' + appService.getErrorMessage(rejection) ,
				'try Again');
			});
		};

		$scope.updateCategory = function(event, category) {
			$scope.isLoading = true;
			$scope.loaderMsg = 'Updating Category...';
			contentService.updateCategory(category).then(function(response) {
				var updatedCategory = new Category(response && response.data);
				$scope.isLoading = false;
				$scope.loaderMsg = '';
				modalService.alert('md',
				'Category Update',
				'Category Updated successfully',
				'Go to Dashboard',
				'Continue..').result.then(function() {
					$state.go('author.dashboard');
				}, function() {
					$state.go('author.category', {id: updatedCategory.categoryId});
				});
			}, function(rejection) {
				$scope.isLoading = false;
				$scope.loaderMsg = '';
				modalService.alert('md',
				'Category Update Failed',
				'Reason/s: ' + appService.getErrorMessage(rejection) ,
				'try Again');
			});
		};

		$scope.deleteCategory = function(event, category) {
			$scope.isLoading = true;
			$scope.loaderMsg = 'Deleting Category...';
			contentService.deleteCategory(category && category.categoryId).then(function(response) {
				var updatedCategory = new Category(response && response.data);
				$scope.isLoading = false;
				$scope.loaderMsg = '';
				modalService.alert('md',
				'Category Delete',
				'Following Category Deleted successfully: <br/>' + updatedCategory.title + '(' + updatedCategory.categoryId + ')',
				'Go to Dashboard').result.then(function() {
					$state.go('author.dashboard');
				});
			}, function(rejection) {
				$scope.isLoading = false;
				$scope.loaderMsg = '';
				modalService.alert('md',
				'Category Delete Failed',
				'Reason/s: ' + appService.getErrorMessage(rejection) ,
				'try Again');
			});
		};

		$scope.cancelCategory = function(event, category) {
			$state.go('.', {id: category && category.categoryId}, {reload: true});
		};

		$scope.addnewCategory = function() {
			$state.go('.', {id: ''}, {reload: true});
		};

		$scope.thumbnailUpload = function(event, resourceData, completeCallback) {
            if (resourceData && $scope.currentCategory.categoryId > 0) {
                contentService.uploadCategoryThumbnail($scope.currentCategory.categoryId, resourceData).then(function() {
                    if (typeof completeCallback === 'function') {
                        completeCallback(true);
                    }
                }, function(rejection) {
                    if (typeof completeCallback === 'function') {
                        completeCallback(false, rejection && rejection.data && rejection.data.Message);
                    }
                });
            } else {
                completeCallback(false, 'Image data or Category Id Missing.');
            }
        };

		$scope.$on('$stateChangeSuccess', function(event, toState, toParams/*, fromState , fromParams*/) {
			pageMetaTagsService.setPageMetaInfo(toState.title, 'Create and Update categories', 'add category,update category,article category');
			if (toState && toState.name && toParams && toParams.id) {
				getCategory(toParams.id);
			} else {
				$scope.currentCategory = new Category();
			}
		});
	};

	categoryController.$inject = ['$rootScope', '$scope', '$state', 'appService', 'contentService', 'modalService', 'Category', 'pageMetaTagsService'];
	module.exports = categoryController;
})();
