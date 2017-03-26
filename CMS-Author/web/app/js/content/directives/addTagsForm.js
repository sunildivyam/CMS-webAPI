'use strict';
(function() {
	var addTagsForm = function(modalService, Utils, Tag, EntityMapper, contentService) {
		return {
			restrict: 'E',
			scope: {
				onSave: '=',
				onCancel: '='
			},
			templateUrl: 'content/add-tags-form.html',
			link: function($scope) {
				if (!$scope.tags) $scope.tags = [];

				$scope.$watch('currentTag.title', function(newValue) {
					if (newValue) $scope.currentTag.name = Utils.parseStringExt(newValue, '-');
				});

				$scope.save = function(event) {
					$scope.isSaving = true;
					contentService.addNewTags($scope.tags).then(function(response) {
						var addedTags = new EntityMapper(Tag).toEntities(response && response.data);
						$scope.isSaving = false;
						if (typeof $scope.onSave === 'function') {
							$scope.onSave(event, addedTags);

							if ($scope.tags.length > addedTags.length) {
								modalService.alert('md',
								'Saving Tags Warning',
								'Few of the tags were already exist in system, so automatically discarded existing ones and added new ones only.',
								'Ok');
							}
						}
					}, function(rejection) {
						$scope.isSaving = false;
						modalService.alert('md',
						'Saving Tags Failed',
						rejection.message || 'Failed Adding Tags. Duplicate Tags Exists or your Internet connection is not working.',
						'Try Again');
					});
				};

				$scope.cancel = function(event) {
					modalService.alert('md',
					'Cancelling Adding Tags.',
					'This action will result to discard all added Tags and will not save the tags. Do you want to proceed?',
					'Yes',
					'No').result.then(function() {
						$scope.currentTag = new Tag();
						if (typeof $scope.onCancel === 'function') {
							$scope.onCancel(event, $scope.tags);
						}
					}, function() {

					});
				};

				$scope.select = function(event, tag, index) {
					$scope.currentTag = $scope.tags[index];
				};

				$scope.add = function() {
					if ($scope.tagsForm.$valid) {
						if (tagExist($scope.tags, $scope.currentTag) === false) {
							$scope.tags.push($scope.currentTag);
							$scope.currentTag = new Tag();
						} else {
							$scope.tagsForm.tagTitle.$duplicate = true;
							$scope.tagsForm.$valid = false;
						}
					}
				};

				function tagExist(tags, tag) {
					var isExist = false;
					if (tags && tags.length && tag) {
						tags.filter(function(item) {
							if (item.name === tag.name) {
								isExist = true;
							}
						});
					}

					return isExist;
				}

				$scope.onTitleChange = function() {
					if ($scope.tagsForm.tagTitle.$duplicate) $scope.tagsForm.tagTitle.$duplicate = false;
				};
			}
		};
	};

	addTagsForm.$inject = ['modalService', 'Utils', 'Tag', 'EntityMapper', 'contentService'];
	module.exports = addTagsForm;
})();
