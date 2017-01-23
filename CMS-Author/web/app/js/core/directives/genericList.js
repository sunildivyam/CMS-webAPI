'use strict';
/*
*	genericList
*	Description
*	genericList directive is responsible for Painting List of Type
*/
(function() {
	var genericList = function() {
		return {
			restrict: 'E',
			replace: false,
			templateUrl: 'core/generic-list.html',
			scope: {
				items: '=',
				itemsType: '=',
				onItemSelect: '=',

				enableHeader: '=',
				enableMaximize: '=',
				enableSearch: '=',
				enableViewModes: '=',
				enableScrollbar: '=',
				enableTags: '=',
				enableFooterLink: '=',
				enablePaging: '=',

				headerTitle: '=',
				headerSummary: '=',
				headerRightLabel: '=',

				viewMode: '=',

				scrollHeight: '=',

				tags: '=',

				footerLinkText: '=',
				footerLinkUrl: '=',
				onFooterLinkClick: '=',

				pagingTotalItems: '=',
				pagingSelectedPage: '=',
				pagingPageSize: '=',	// Number of Items per Page
				pagingPagerSize: '=',	// Number of Page links to display on Pager
				onPagingPageChange: '=',

				onRefresh: '=', 	// calls when all list items are rendered or View Mode is changed
				isLoading: '='	// To display a loader while list items getting loaded
			},
			controller: 'genericListController',
			link: function($scope, element) {

				$scope.$on("onRepeatItemsLoaded", function(event) {
		            $(element).find('.description, .short-description').dotdotdot({
		                wrap: 'letters',
		                watch: 'window',
		                height: (17 * 4)
		            });

		            if (typeof $scope.onRefresh === 'function') {
		                $scope.onRefresh(event);
		            }
		        });
			}
		};
	};

	genericList.$inject = [];
	module.exports = genericList;
})();
