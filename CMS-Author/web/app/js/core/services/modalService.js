'use strict';
/*
*   modalService
*   Description
*   modalService allows you to create modal Popups
*/

(function() {
    var modalService = function($uibModal) {
        function alert(size, title, htmlContent, okLabel, cancelLabel) {
            var options = {
                animation: true,
                templateUrl: 'core/alert-modal.html',
                size: size || 'lg',
                controllerAs: '$ctrl',
                resolve: {
                    alertData: function() {
                        return {
                            title: title || 'Alert',
                            htmlContent: htmlContent || '',
                            okLabel: okLabel,
                            cancelLabel: cancelLabel
                        };
                    }
                },
                controller: ['$scope', 'alertData', function($scope, alertData) {
                    $scope.alertData = alertData;
                }]
            };

            return $uibModal.open(options);
        }

        return {
            alert: alert
        };
    };

    modalService.$inject = ['$uibModal'];
    module.exports = modalService;
})();
