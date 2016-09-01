'use strict';
/*
*   responsiveDetectionService Service
*   Description
*   responsiveDetectionService Service provides current bootstrap breakpoint
*   based on the current window size
*/
(function() {
    var responsiveDetectionService = function($window) {

        var BREAKPOINTS = {
            'xs': {'name': 'xs', 'size': 768},
            'sm': {'name': 'sm', 'size': 992},
            'md': {'name': 'md', 'size': 1200},
            'lg': {'name': 'lg', 'size': undefined}
        };

        function getBreakpoint() {
            var w = $window.innerWidth;
            if (w < BREAKPOINTS.xs.size) {
                return BREAKPOINTS.xs.name;
            } else if (w < BREAKPOINTS.sm.size) {
                return BREAKPOINTS.sm.name;
            } else if (w < BREAKPOINTS.md.size) {
                return BREAKPOINTS.md.name;
            } else {
                return BREAKPOINTS.lg.name;
            }
        }

        function getCurrentBreakpoint() {
            return getBreakpoint();
        }

        function getBreakpointList() {
            return BREAKPOINTS;
        }

        return {
            getCurrentBreakpoint: getCurrentBreakpoint,
            getBreakpointList: getBreakpointList
        };
    };
    responsiveDetectionService.$inject = ['$window'];
    module.exports = responsiveDetectionService;
})();
