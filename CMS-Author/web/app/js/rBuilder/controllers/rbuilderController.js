'use strict';
/*
*   rbuilderController
*   Description
*   rbuilderController.
*/

(function() {
    var rbuilderController = function($rootScope, $scope) {
        

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams/*, fromState , fromParams*/) {
            
        });
    };

    rbuilderController.$inject = ['$rootScope', '$scope'];
    module.exports = rbuilderController;
})();
