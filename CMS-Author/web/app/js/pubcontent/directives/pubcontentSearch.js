'use strict';
(function() {
	var pubcontentSearch = function() {
		return {
			restrict: 'E',
			scope: {
				searchString:'@',
				categories: '=',
				onSearch: '=',
				initSelectedItem: '='
			},
			templateUrl: 'pubcontent/pubcontent-search.html',
			link: function($scope) {
				var defaultSelectedItem = {
					title: 'All'
				};

				$scope.selectedItem = {
					item: defaultSelectedItem
				};

				$scope.$watch('initSelectedItem', function(initSelectedItem) {
					if (initSelectedItem instanceof Object) {
						if (!initSelectedItem.title) {
							initSelectedItem.title = initSelectedItem.name.replace('-', ' ');
						}
						$scope.selectedItem.item = initSelectedItem;
					} else {
						$scope.selectedItem.item = defaultSelectedItem;
					}
				});

				$scope.$watch('categories', function(newCategories) {
					if (newCategories instanceof Array) {
						$scope.listOfCategories = angular.copy(newCategories);
						$scope.listOfCategories.unshift({
							title: 'All'
						});
					}
				});

				$scope.clear = function(event) {
					event.stopPropagation();
					$scope.searchString = '';
				}

				$scope.search = function(event) {
					if (typeof $scope.onSearch === 'function') {
						$scope.onSearch(event, $scope.selectedItem && $scope.selectedItem.item, $scope.searchString);
					}
				};
			}
		};
	};

	pubcontentSearch.$inject = [];
	module.exports = pubcontentSearch;
})();
