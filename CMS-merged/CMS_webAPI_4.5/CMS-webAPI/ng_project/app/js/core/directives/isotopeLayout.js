'use strict';
(function() {
    var isotopeLayout = function($timeout) {
        return {
            link: function($scope, elm) {
                $timeout(function() {
                    if (typeof $scope.refreshIsotopeLayout === 'function') {
                        if (elm && elm.length > 0 ) {
                            $scope.refreshIsotopeLayout(elm[0]);
                        }
                    }
                });
            }
        };
    };

    isotopeLayout.$inject = ['$timeout'];
    module.exports = isotopeLayout;
})();
