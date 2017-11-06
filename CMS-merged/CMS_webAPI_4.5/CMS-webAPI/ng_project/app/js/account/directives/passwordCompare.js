'use strict';

(function() {
	var passwordCompare = function() {
		return {
			'require': 'ngModel',
			'link': function($scope, element, attrs, controller) {
				var $element = $(element);
				var passwordToComparewith = '#' + attrs.passwordCompare;

				$element.add(passwordToComparewith).on('blur', function() {
					$scope.$apply(function () {
						var v = $element.val() === $(passwordToComparewith).val();
						controller.$setValidity('passwordcompare', v);
					});
				});
			}
		};
	};
	passwordCompare.$inject = [];
	module.exports = passwordCompare;
})();