'use strict';
/*
*	customNavbar
*	Description
*	customNavbar directive is responsible for Painting Nav bar as per Items given
*/
(function() {
	var customNavbar = function() {
		return {
			restrict: 'E',
			replace: false,
			scope: {
				name: '@',			// used for navid, statename
				items: '=',			// used for nv items ie. categories, tags etc. entities
				selectedItemName: '=',
				title: '@',			// displays brand section title
				stateName: '@',		// StateName like pub.category etc. to used in the item links
				className: '@',		// navbar class name eg. navbar-default, bavbar-inverse etc.
				itemIconClassNamePre: '@',	// icon class for prefixing item, eg. fa fa-list or glyphicon gyphicon-list etc.
				itemIconClassNamePost: '@',	// icon class for postfixing item, eg. fa fa-list or glyphicon gyphicon-list etc.
				preHeaderIconClassName: '@',	// icon class for prefixing brand title, eg. fa fa-pencil or glyphicon gyphicon-pencil etc.
				postHeaderIconClassName: '@',	// icon class for postfixing brand title, eg. fa fa-triangle-bottom or glyphicon gyphicon-triangle-bottom etc.
				onSelect: '='
			},
			templateUrl: 'core/custom-navbar.html',
			link: function($scope) {
				$scope.isLoading = true;

				$scope.onItemClick = function(event, item) {
					$scope.selectedItemName = item && item.name;

					if (typeof $scope.onSelect === 'function') {
						event.preventDefault();
						$scope.onSelect(event, item);
					}
				};

				$scope.$watch('selectedItemName', function(newValue) {
					setTitleStr(newValue);
				});

				$scope.$watch('items', function(newValue) {
					$scope.isLoading = true;
					if (newValue && newValue.length > 0) {
						$scope.isLoading = false;
					}
					setTitleStr($scope.selectedItemName);
				});

				function setTitleStr(selectedItemName) {
					if (!$scope.title) {
						$scope.titleStr = getItemTitleByName(selectedItemName);
					} else {
						$scope.titleStr = angular.copy($scope.title);
					}
				}

				function getItemTitleByName(itemName) {
					var defaultTitle = 'Explore';
					if ($scope.items instanceof Array) {
						var foundItems = $scope.items.filter(function(item) {
							if (item.name === itemName) {
								return item;
							}
						});
						if (foundItems instanceof Array && foundItems.length > 0) {
							return foundItems[0].title;
						}
					}
					return defaultTitle;
				}
			}
		};
	};

	customNavbar.$inject = [];
	module.exports = customNavbar;
})();
