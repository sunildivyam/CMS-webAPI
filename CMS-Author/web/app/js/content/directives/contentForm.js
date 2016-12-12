'use strict';
(function() {
	var contentForm = function(modalService, Utils) {
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
				onPreview: '='
			},
			templateUrl: 'content/content-form.html',
			link: function($scope) {
				$scope.$watch('content.title', function(newValue) {
					if (newValue) $scope.content.name = Utils.parseStringExt(newValue, '-');
				});

				$scope.save = function(event) {
					if ($scope.contentForm.$valid === true) {
						if (typeof $scope.onSave === 'function') {
							$scope.onSave(event, $scope.content);
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
						$scope.onPreview(event, $scope.content);
					} else {
						//
					}
				};
			}
		};
	};

	contentForm.$inject = ['modalService', 'Utils'];
	module.exports = contentForm;
})();
