'use strict';
(function() {
    var fileInput = function($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileInput);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    };

    fileInput.$inject = ['$parse'];
    module.exports = fileInput;
})();
