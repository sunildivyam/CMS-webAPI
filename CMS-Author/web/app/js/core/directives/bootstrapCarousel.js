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
				readMoreUrl: '@'
			},
			templateUrl: 'core/bootstrap-carousel.html',
			link: function() {
			}
		};
	};

	bootstrapCarousel.$inject = [];
	module.exports = bootstrapCarousel;
})();
