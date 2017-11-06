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

        function showContentPreviewModal(content, size) {
            var options = {
                animation: true,
                templateUrl: 'core/content-preview-modal.html',
                size: size || 'lg',
                controllerAs: '$ctrl',
                resolve: {
                    modalData: function() {
                        return {
                            title: 'Content Preview',
                            content: content || {},
                            okLabel: 'Close Preview',
                            cancelLabel: ''
                        };
                    }
                },
                controller: ['$scope', 'modalData', function($scope, modalData) {
                    $scope.modalData = modalData;
                }]
            };

            return $uibModal.open(options);
        }

        function showContentHistoryModal(dlContentHistory, size) {
            var options = {
                animation: true,
                templateUrl: 'core/content-history-modal.html',
                size: size || 'lg',
                controllerAs: '$ctrl',
                resolve: {
                    modalData: function() {
                        return {
                            title: 'Content Authoring History',
                            dlContentHistory: dlContentHistory || [],
                            okLabel: 'Close History',
                            cancelLabel: ''
                        };
                    }
                },
                controller: ['$scope', 'modalData', function($scope, modalData) {
                    $scope.modalData = modalData;
                }]
            };

            return $uibModal.open(options);
        }

        function showUploadResourceModal(uploadCallback, size) {
            var options = {
                animation: true,
                templateUrl: 'core/resource-upload-modal.html',
                size: size || 'lg',
                controllerAs: '$ctrl',
                resolve: {
                    modalData: function() {
                        return {
                            title: 'Upload File',
                            uploadCallback: uploadCallback,
                            okLabel: 'Close',
                            cancelLabel: ''
                        };
                    }
                },
                controller: ['$scope', 'modalData', function($scope, modalData) {
                    $scope.modalData = modalData;
                }]
            };

            return $uibModal.open(options);
        }

        return {
            alert: alert,
            showContentPreviewModal: showContentPreviewModal,
            showContentHistoryModal: showContentHistoryModal,
            showUploadResourceModal: showUploadResourceModal
        };
    };

    modalService.$inject = ['$uibModal'];
    module.exports = modalService;
})();
