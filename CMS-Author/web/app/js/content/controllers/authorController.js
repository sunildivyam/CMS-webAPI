'use strict';
/*
*   authorController
*   Description
*   authorController controls the content page Level Scope Data.
*/

(function() {
    var authorController = function($scope, $state, Utils) {
        $scope.$on('$stateChangeSuccess', function(event, toState/*, toParams, fromState , fromParams*/) {
            if (toState) {
                switch(toState.name) {
                    case 'author':
                        $state.go('author.dashboard');
                        break;
                    default:
                        // Sets Meta information for Page
                        Utils.setMetaInfo(toState.title);
                }
            }
        });
    };

    authorController.$inject = ['$scope', '$state', 'Utils'];
    module.exports = authorController;
})();
