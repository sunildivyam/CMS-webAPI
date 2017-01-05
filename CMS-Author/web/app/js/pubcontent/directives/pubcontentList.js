'use strict';
(function() {
	var pubcontentList = function(Utils, pubcontentService) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				contentItems: '=',
				listTitle: '@',
				listLabel: '@',
				footerTitle: '@',
				footerLink: '@',
				uniqueTags: '=',
				enablePagination: '=',
				totalPageItems: '=',
				itemsPerPage: '=',
				maxPageSize: '=',
				onRefresh: '='
			},
			templateUrl: 'pubcontent/pubcontent-list.html',
			link: function($scope) {
				$scope.$on("onRepeatItemsLoaded", function(event) {
					if (typeof $scope.onRefresh === 'function') {
						$scope.onRefresh(event);
					}
				});
			}
		};
	};

	pubcontentList.$inject = ['Utils', 'pubcontentService'];
	module.exports = pubcontentList;
})();
