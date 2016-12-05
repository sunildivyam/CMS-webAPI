'use strict';
(function() {
	var tagForm = function(modalService, Utils) {
		return {
			restrict: 'E',
			scope: {
				tag: '=',
				onSave: '=',
				onDelete: '=',
				onUpdate: '=',
				onCancel: '='
			},
			templateUrl: 'content/tag-form.html',
			link: function($scope) {
				$scope.$watch('tag.title', function(newValue) {
					if (newValue) $scope.tag.name = Utils.parseStringExt(newValue, '-');
				});

				$scope.save = function(event) {
					if ($scope.tagForm.$valid === true) {
						if (typeof $scope.onSave === 'function') {
							$scope.onSave(event, $scope.tag);
						}
					} else {
						//
					}
				};

				$scope.update = function(event) {
					if ($scope.tagForm.$valid === true) {
						if (typeof $scope.onUpdate === 'function') {
							$scope.onUpdate(event, $scope.tag);
						}
					} else {
						//
					}
				};

				$scope.delete = function(event) {
					modalService.alert('md',
					'Delete Tag',
					'Tag will be deleted permanently and can not be recovered. <br/> Do you want to proceed?',
					'Yes',
					'No').result.then(function() {
						if (typeof $scope.onDelete === 'function') {
							$scope.onDelete(event, $scope.tag);
						}
					});
				};

				$scope.cancel = function(event) {
					modalService.alert('md',
					'Cancel Tag',
					'This will clear the unsaved data. <br/> Do you want to proceed?',
					'Yes',
					'No').result.then(function() {
						if (typeof $scope.onCancel === 'function') {
							$scope.onCancel(event, $scope.tag);
						} else {
							$scope.tag = {};
						}
					});
				};
			}
		};
	};

	tagForm.$inject = ['modalService', 'Utils'];
	module.exports = tagForm;
})();
