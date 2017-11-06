'use strict';
/**
* @ngdoc directive
* @name raiweb.core.directive:tinyScrollbar
* @scope
* @restrict E

* @description
* Displays a progress tinyScrollbar modal to parent or body

* @param {boolean} atBody defaults to "false".
* A "false" value specifies that tinyScrollbar should be modal to immidiate relative parent.
* A "true" value specifies that tinyScrollbar should be modal to body.

* @param {boolean} isLoading toggles the tinyScrollbar
* @param {string=} message loading message string
*/

(function() {
    var tinyScrollbar = function() {
        return {
            restrict: 'A',
            transclude: true,
            scope: {
                enableScrollbar: '=',
                scrollHeight: '='
            },
            templateUrl: 'core/tiny-scrollbar.html',
            link: function($scope, element) {
                $scope.$watch('scrollHeight', function(newValue) {
                    if (newValue > 0 && $scope.enableScrollbar === true) {
                        createOrUpdate();
                    }
                });

                function createOrUpdate() {
                    var $element = $(element);
                    var $scrollbarElm = $element.find('.tiny-scrollbar');
                    var $viewPort = $scrollbarElm.find('.viewport');
                    var $overview = $viewPort.find('.overview');
                    var scrollbar;

                    if ($scrollbarElm && $scrollbarElm.length > 0) {
                        scrollbar = $scrollbarElm.data("plugin_tinyscrollbar");
                    }

                    $overview.css('position', 'absolute');
                    if ($overview.outerHeight() >= $scope.scrollHeight) {
                        $viewPort.css('height', $scope.scrollHeight + 'px');
                    } else {
                        $viewPort.css('height', 'auto');
                        $overview.css('position', 'static');
                    }

                    if (scrollbar) {
                        scrollbar.update();
                    } else {
                        // Else Create scrollbar
                        $element.addClass('tiny-scrollbar');
                        $element.tinyscrollbar({thumbSize: 10});
                    }
                }
            }
        };
    };

    tinyScrollbar.$inject = [];
    module.exports = tinyScrollbar;
})();
