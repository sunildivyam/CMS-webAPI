'use strict';
(function() {
    var ck = function($timeout) {
        return {
            require: '?ngModel',
            scope: {
                onInstanceReady: '=',    // should be a promise from parent controller
                mode: '@'
            },
            link: function($scope, elm, attr, ngModel) {
                $timeout(function() {
                    if (!ngModel) return;

                    var ck;
                    if ($scope.mode==='comment') {
                        ck = CKEDITOR.replace(elm[0], {
                            extraPlugins: 'mathjax,codesnippet',
                            removePlugins:'sourcearea',
                            mathJaxLib: '/ckeditor/libs/mathjax/MathJax.js?config=TeX-AMS_HTML'
                        });
                    } else {
                        ck = CKEDITOR.replace(elm[0], {
                            extraPlugins: 'sourcedialog,mathjax,codesnippet',
                            removePlugins:'sourcearea',
                            mathJaxLib: '/ckeditor/libs/mathjax/MathJax.js?config=TeX-AMS_HTML',
                            //mathJaxLib: '//cdn.mathjax.org/mathjax/2.6-latest/MathJax.js?config=TeX-AMS_HTML',
                            filebrowserBrowseUrl: '/resourcebrowser',
                            filebrowserUploadUrl: '/browser/upload.php'
                        });
                    }
                    

                    $timeout(function() {
                        // This updates the ngModelwhen ck editor data changes
                        ck.on('change', updateModel);

                        // This updates the ckeditor data when ngmodel is changed
                        ngModel.$render = function () {
                            updateCkEditor();
                        };
                    });

                    ck.on('instanceReady', function () {               
                        updateCkEditor();
                        if ($scope.onInstanceReady && $scope.onInstanceReady.resolve) {
                            $scope.onInstanceReady.resolve(ck);
                        }
                    });

                    function updateModel() {
                        ngModel.$setViewValue(ck.getData());                        
                    }

                    function updateCkEditor() {
                        ck.setData(ngModel.$viewValue);
                    }
                });
            }
        };
    };

    ck.$inject = ['$timeout'];
    module.exports = ck;
})();
