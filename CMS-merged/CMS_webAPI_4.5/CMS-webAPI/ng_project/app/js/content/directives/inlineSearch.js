'use strict';
(function() {
	var inlineSearch = function() {
		return {
			templateUrl: 'content/inline-search.html',
			link: function($scope) {
				$scope.clearSearch = function(event) {
					event.preventDefault();
					$scope.searchKeywords = '';
				};
			}
		};
	};

	inlineSearch.$inject = [];
	module.exports = inlineSearch;
})();
