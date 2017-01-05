'use strict';
(function() {
    var onNgRepeatItem = function($timeout) {
        return {
            link: function($scope, elm, attrs) {
                $timeout(function() {
                    if ($scope.$last === true) {
                        $scope.$emit(attrs.onNgRepeatItem);
                    }
                });
            }
        };
    };

    onNgRepeatItem.$inject = ['$timeout'];
    module.exports = onNgRepeatItem;
})();
