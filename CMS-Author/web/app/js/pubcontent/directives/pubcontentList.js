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
			link: function($scope, element) {
				$scope.$on("onRepeatItemsLoaded", function(event) {
					$(element).find('.short-description').dotdotdot({
						wrap: 'letters',
						watch: 'window',
						height: (17 * 4)
					});

					$(element).find('.short-description').on('mouseenter', function(event) {
						$(this).slideUp();
						$(this).closest('.media-body').find('.short-description-hovered').slideDown();
					});

					$(element).find('.short-description-hovered').on('mouseleave', function(event) {
						$(this).slideUp();
						$(this).closest('.media-body').find('.short-description').slideDown();
					});

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
