'use strict';
(function() {
    var ck = function($timeout) {
        return {
            require: '?ngModel',
            link: function(scope, elm, attr, ngModel) {
                var ck;
                ck = CKEDITOR.replace(elm[0]);

                if (!ngModel) return;

                ck.on('instanceReady', function () {
                    ck.setData(ngModel.$viewValue);
                    ngModel.$render();
                    ck.on('change', updateModel);
                    ck.on('key', updateModel);
                    ck.on('dataReady', updateModel);
                });

                function updateModel() {
                    scope.$apply(function () {
                        ngModel.$setViewValue(ck.getData());
                    });
                }

                // This updates the ckeditor data when ngmodel is changed
                ngModel.$render = function () {
                    $timeout(function() {
                      ck.setData(ngModel.$viewValue);
                    });
                };
            }
        };
    };

    ck.$inject = ['$timeout'];
    module.exports = ck;
})();
