'use strict';
/**
* @ngdoc directive
* @name raiweb.content.directive:categoryForm
* @scope
* @restrict EAC

* @description
*
* @param {object} logo Logo information Object
* @param {string} size size value 'xs', 'md', 'lg' etc.
*/

(function() {
	var categoryForm = function(modalService, Utils, appService) {
		return {
			restrict: 'EAC',
			scope: {
				category: '=',
				onSave: '=',
				onDelete: '=',
				onUpdate: '=',
				onCancel: '=',
				onAddnew: '=',
				isLoading: '=',
				loaderMsg: '=',
			    onThumbnailUpload: '='
			},
			templateUrl: 'content/category-form.html',
			link: function ($scope) {
			    function setThumbnailUrl(url) {
			        if (url === false) {
			            $scope.thumbnailUrl = '';
			        } else {
			            $scope.thumbnailUrl = [appService.getCategoryImagesUrl(), $scope.category.categoryId, $scope.category.name + '?cb=' + (new Date()).getTime()].join('/');
			        }
			    }

				$scope.$watch('category.title', function(newValue) {
					if (newValue) $scope.category.name = Utils.parseStringExt(newValue, '-');
				});

				$scope.$watch('category', function(newValue) {
					if (newValue && newValue.categoryId) {
						setThumbnailUrl();
					} else {
						setThumbnailUrl(false);
					}				
				});


				$scope.save = function(event) {
					if ($scope.categoryForm.$valid === true) {
						if (typeof $scope.onSave === 'function') {
							$scope.onSave(event, $scope.category);
						}
					} else {
						//
					}
				};

				$scope.update = function(event) {
					if ($scope.categoryForm.$valid === true) {
						if (typeof $scope.onUpdate === 'function') {
							$scope.onUpdate(event, $scope.category);
						}
					} else {
						//
					}
				};

				$scope.delete = function(event) {
					modalService.alert('md',
					'Delete Category',
					'Category will be deleted permanently and can not be recovered. <br/> Do you want to proceed?',
					'Yes',
					'No').result.then(function() {
						if (typeof $scope.onDelete === 'function') {
							$scope.onDelete(event, $scope.category);
						}
					}, function() {
						//
					});
				};

				$scope.cancel = function(event) {
					modalService.alert('md',
					'Cancel Category',
					'This will clear the unsaved data. <br/> Do you want to proceed?',
					'Yes',
					'No').result.then(function() {
						if (typeof $scope.onCancel === 'function') {
							$scope.onCancel(event, $scope.category);
						} else {
							$scope.category = {};
						}
					}, function() {
						//
					});
				};

				$scope.addnew = function(event) {
					modalService.alert('md',
					'Add New Category',
					'Any unsaved data will be lost. <br/> Do you want to proceed?',
					'Yes',
					'No').result.then(function() {
						if (typeof $scope.onAddnew === 'function') {
							$scope.onAddnew(event, $scope.category);
						} else {
							$scope.category = {};
						}
					}, function() {
						//
					});
				};

				$scope.addThumbnail = function () {
				    setThumbnailUrl(false);
				    modalService.showUploadResourceModal($scope.onThumbnailUpload, 'md').result.then(function () {
				        setThumbnailUrl();
				    }, function () {
				        setThumbnailUrl();
				    });
				};
			}
		};
	};

	categoryForm.$inject = ['modalService', 'Utils', 'appService'];
	module.exports = categoryForm;
})();
