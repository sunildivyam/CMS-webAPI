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
				slides: '=',
				options: '=',
				carouselName: '@'
			},
			templateUrl: 'core/bootstrap-carousel.html',
			link: function() {
			}
		};
	};

	bootstrapCarousel.$inject = [];
	module.exports = bootstrapCarousel;
})();
