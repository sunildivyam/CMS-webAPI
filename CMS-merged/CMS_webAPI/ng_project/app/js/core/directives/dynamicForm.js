'use strict';
/**
* @ngdoc directive
* @name raiweb.core.directive:dynamicForm
* @scope
* @restrict E

* @description
*	dynamicForm directive creates a Form, based on a JSON object (a complete tree structure)
*   and allows to update JSON values, and also allows you to delete and add properties to JSON.
** Structure
    value Types and Input HTML tag

    string                  input type=text
    number                  input type=text
    object                  div
    array                   div

*/
(function() {
	var dynamicForm = function() {
		return {
			restrict: 'E',
			scope: {
				formJson: '=',
                onSave: '=',
                name: '@'
			},
			templateUrl: 'core/dynamic-form.html',
			link: function($scope, element) {
                var $root = $($(element).find('.root-node'));
                $scope.isExpandAll = true;

				$scope.$watch('formJson', function(json) {
                    $scope.isExpandAll = true;
                    $scope.schemaObj = jsonToSchema(json, 'root');                    
                });

                $scope.toggleExpand = function(event) {
                    event && event.preventDefault();
                    $scope.isExpandAll = !$scope.isExpandAll;
                    var $nodeNontainers;
                    if ($scope.isExpandAll) {
                        $nodeNontainers = $root.find('.node-container').addClass('in');
                    } else {
                        $nodeNontainers = $root.find('.node-container.in').removeClass('in');                        
                    }
                };

                $scope.onPreviewClick = function(event) {
                    $scope.isPreviewMode = !$scope.isPreviewMode;
                    if ($scope.isPreviewMode) {
                        //$scope.outPutJsonString = JSON.stringify(schemaToJson($scope.schemaObj), null, '\t');
                    } else {
                        //$scope.schemaObj = jsonToSchema(JSON.parse($scope.outPutJsonString), 'root');
                    } 
                    
                };

                function jsonToSchema(jsonObj, propName) {
                    var schemaObj = {};
                    schemaObj.name = propName;                     
                    schemaObj.type = typeof jsonObj;
                    
                    if (jsonObj instanceof Array) {
                        schemaObj.type = "array";
                        schemaObj.properties = {};
                        for (var i = 0; i < jsonObj.length; i++) {
                            var propKeyName = (propName + '_'+ i);
                            var childProperty = jsonToSchema(jsonObj[i], propKeyName);
                            schemaObj.properties[propKeyName] = childProperty;
                        }                                
                    } else if (jsonObj instanceof Object) {
                        schemaObj.properties = {};
                        for (var key in jsonObj) {
                            var childProperty = jsonToSchema(jsonObj[key], key);
                            schemaObj.properties[key] = childProperty;
                        } 
                    } else {
                        schemaObj.value = jsonObj; 
                    }
                    return schemaObj;
                }

                function schemaToJson(schemaObj) {
                    var jsonObj;
                    if (schemaObj.type === 'object') {
                        jsonObj = {};
                    } else if(schemaObj.type === 'array') {
                        jsonObj = [];
                        
                    } else {

                    }
                }
			}
		};
	};

	dynamicForm.$inject = [];
	module.exports = dynamicForm;
})();
