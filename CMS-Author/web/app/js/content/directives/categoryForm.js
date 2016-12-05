'use strict';
(function() {
	var categoryForm = function(modalService, Utils) {
		return {
			restrict: 'E',
			scope: {
				category: '=',
				onSave: '=',
				onDelete: '=',
				onUpdate: '=',
				onCancel: '='
			},
			templateUrl: 'content/category-form.html',
			link: function($scope) {
				$scope.$watch('category.title', function(newValue) {
					if (newValue) $scope.category.name = Utils.parseStringExt(newValue, '-');
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
					});
				};
			}
		};
	};

	categoryForm.$inject = ['modalService', 'Utils'];
	module.exports = categoryForm;
})();
