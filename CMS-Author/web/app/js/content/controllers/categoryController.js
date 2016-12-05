'use strict';
/*
*	categoryController
*	Description
*	categoryController controls the content page Level Scope Data.
*/

(function() {
	var categoryController = function($rootScope, $scope, $state, appService, contentService, modalService, Category, metaInformationService, pageTitleService) {
		$scope.currentCategory = new Category();

		function setMetaInfo(category) {
			if (category instanceof Object) {
				metaInformationService.setMetaDescription(category.description);
				metaInformationService.setMetaKeywords(category.name);
				pageTitleService.setPageTitle(category.title);
			} else {
				metaInformationService.resetMetaDescription();
				metaInformationService.resetMetaKeywords();
				pageTitleService.setPageTitle();
			}
		}

		function getCategory(id) {
			if (id) {
				var categoryId = parseInt(id);
				contentService.getCategoryById(categoryId).then(function(response) {
					var category = new Category(response && response.data);
					if (category instanceof Object) {
						$scope.currentCategory = category;
						setMetaInfo($scope.currentCategory);
					} else {
						modalService.alert('md',
						'Category Not Found',
						'Category with Id: ' + id + ' not found',
						'Go to Dashboard').result.then(function() {
							$state.go('dashboard');
						});
					}
				}, function(rejection) {
					modalService.alert('md',
					'Category loading Failed',
					'Reason/s: ' + (appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') || 'Category Not Found.') ,
					'Go to Dashboard').result.then(function() {
						$state.go('dashboard');
					});
				});
			}
		}

		$scope.saveCategory = function(event, category) {
			contentService.addNewCategory(category).then(function(response) {
				var addedCategory = new Category(response && response.data);

				modalService.alert('md',
				'Category Saved',
				'Category saved successfully',
				'Go to Dashboard',
				'Continue..').result.then(function() {
					$state.go('dashboard');
				}, function() {
					$state.go('category', {id: addedCategory.categoryId});
				});
			}, function(rejection) {
				modalService.alert('md',
				'Category Saving Failed',
				'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') ,
				'try Again');
			});
		};

		$scope.updateCategory = function(event, category) {
			contentService.updateCategory(category).then(function(response) {
				var updatedCategory = new Category(response && response.data);

				modalService.alert('md',
				'Category Update',
				'Category Updated successfully',
				'Go to Dashboard',
				'Continue..').result.then(function() {
					$state.go('dashboard');
				}, function() {
					$state.go('category', {id: updatedCategory.categoryId});
				});
			}, function(rejection) {
				modalService.alert('md',
				'Category Update Failed',
				'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') ,
				'try Again');
			});
		};

		$scope.deleteCategory = function(event, category) {
			contentService.deleteCategory(category && category.categoryId).then(function(response) {
				var updatedCategory = new Category(response && response.data);

				modalService.alert('md',
				'Category Delete',
				'Following Category Deleted successfully: <br/>' + updatedCategory.title + '(' + updatedCategory.categoryId + ')',
				'Go to Dashboard').result.then(function() {
					$state.go('dashboard');
				});
			}, function(rejection) {
				modalService.alert('md',
				'Category Delete Failed',
				'Reason/s: ' + appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') ,
				'try Again');
			});
		};

		$scope.cancelCategory = function(event, category) {
			$state.go('.', {id: category && category.categoryId}, {reload: true});
		};

		$scope.$on('$stateChangeSuccess', function(event, toState, toParams/*, fromState , fromParams*/) {
			if (toState && toState.name && toParams && toParams.id) {
				getCategory(toParams.id);
			} else {
				$scope.currentCategory = new Category();
			}
		});
	};

	categoryController.$inject = ['$rootScope', '$scope', '$state', 'appService', 'contentService', 'modalService', 'Category', 'metaInformationService', 'pageTitleService'];
	module.exports = categoryController;
})();
