'use strict';
/*
*	bootstrapCarousel
*	Description
*	bootstrapCarousel directive is responsible for
*	loading Bootstrap Carousel using css classes only
*/
(function() {
	var bootstrapCarousel = function() {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				slides: '=',	// name, title, description, image=/slideimages/name.png
				options: '=',
				carouselName: '@',
				readMoreUrl: '@',
				imagesUrl: '@'
			},
			templateUrl: 'core/bootstrap-carousel.html',
			link: function($scope) {
				$scope.slideImageUrl = function(categoryId, name) {
					return [$scope.imagesUrl || '', categoryId, name].join('/');
				}
			}
		};
	};

	bootstrapCarousel.$inject = [];
	module.exports = bootstrapCarousel;
})();
