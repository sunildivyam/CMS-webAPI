'use strict';
(function() {
	var pubcontentList = function(Utils, pubcontentService) {
		return {
			restrict: 'E',
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
				maxPageSize: '='
			},
			templateUrl: 'pubcontent/pubcontent-list.html',
			link: function($scope) {
				//$scope.itemsPerPage = $scope.itemsPerPage || 10;
				$scope.maxPageSize = $scope.maxPageSize || 5;
			}
		};
	};

	pubcontentList.$inject = ['Utils', 'pubcontentService'];
	module.exports = pubcontentList;
})();
