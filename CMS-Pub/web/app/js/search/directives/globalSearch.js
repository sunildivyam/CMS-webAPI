'use strict';
(function() {
	var globalSearch = function($state) {
		return {
			restrict: 'E',
			scope: {
				mode: '@mode',
				searchKeywords: '@'
			},
			templateUrl: 'search/global-search.html',
			link: function($scope, element) {
				$scope.searchKeywords = '';
				var $element = $(element);
				var $searchForm = $element.find('form');
				var $input = $element.find('.global-search-keywords');

				$searchForm.submit(function(event) {
					event.preventDefault();
					var keywords = $scope.searchKeywords.trim();
					if ($scope.mode !== 'expanded' && !keywords) {
						$input.focus();
					}

					if (keywords) {
						if ($scope.mode !== 'expanded') {
							$input.removeClass('open');
							$scope.searchKeywords = '';
						}

						$state.go('search', {
							keywords: keywords
						}, {
							reload: false
						});
					}
				});

				$input.focus(function() {
					if ($scope.mode !== 'expanded') {
						$input.addClass('open');
					}
				});

				$input.focusout(function() {
					var keywords = $scope.searchKeywords.trim();
					if ($scope.mode !== 'expanded' && !keywords) {
						$input.removeClass('open');
					}
				});

				$scope.$watch('mode', function(mode) {
					if (mode === 'expanded') {
						$input.addClass('open');
					}
				});
			}
		};
	};

	globalSearch.$inject = ['$state'];
	module.exports = globalSearch;
})();
