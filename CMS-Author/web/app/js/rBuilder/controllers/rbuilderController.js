'use strict';
/*
*   rbuilderController
*   Description
*   rbuilderController.
*/

(function() {
    var rbuilderController = function($rootScope, $scope, rbuilderService, ResumeFormat) {
        rbuilderService.getResumeFormat().then(function(response) {
        	$scope.currentResumeFormat = new ResumeFormat(response && response.data);
        });

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams/*, fromState , fromParams*/) {
            
        });
    };

    rbuilderController.$inject = ['$rootScope', '$scope', 'rbuilderService', 'ResumeFormat'];
    module.exports = rbuilderController;
})();
