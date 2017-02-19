'use strict';
(function() {
	var pubCategoryView = function() {
		return {
			restrict: 'E',
			scope: {
				category: '=',
				isLoading: '='
			},
			templateUrl: 'pubcontent/pubcategory-view.html',
			link: function() {

			}
		};
	};

	pubCategoryView.$inject = [];
	module.exports = pubCategoryView;
})();
