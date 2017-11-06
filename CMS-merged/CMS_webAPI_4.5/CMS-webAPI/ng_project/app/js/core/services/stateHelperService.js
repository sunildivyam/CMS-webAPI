'use strict';
(function() {
	var stateHelperService = function($state, $location) {
		/*
        *   isStateExist is a private method
        *   Description:
        *   Checks if stateName is created and exists
        */
        function isStateExist(stateName) {
            var states = $state.get();
            var isExist = false;
            if (states instanceof Array && typeof stateName === 'string' && stateName !== '') {
                states.filter(function(state) {
                    if (state.name === stateName) {
                        isExist = true;
                        return;
                    }
                });
            }
            return isExist;
        }

        /*
        *   Converts query to State Params Object
        */
        function convertQueryToStateParamsObj(query) {
            if (!query && typeof query !== 'string') {
                return;
            }
            var queryParamsArray = query.split('&');
            var stateParamsObj = {};
            queryParamsArray.filter(function(param) {
                var paramValuePair = param.split('=');
                stateParamsObj[paramValuePair[0]] = paramValuePair[1];
            });
            return stateParamsObj;
        }

        /*
        *   loadCurrentOrDefaultState is a private method
        *   Description:
        *   On page Refresh, if state Url is present, it navigates to corresponding State, else to Home Page
        */
        function loadCurrentOrDefaultState() {
            var currentStateUrl = $location.$$url || '/home';
            var currentStateUrlAndQuery = currentStateUrl.split('?');
            var query =  currentStateUrlAndQuery[1];
            currentStateUrl = currentStateUrlAndQuery[0];
            var currentStateName = currentStateUrl.split('/');
            currentStateName.shift();
            currentStateName = currentStateName.join('.');
            var stateParamsObj = convertQueryToStateParamsObj(query);
            if (isStateExist(currentStateName)) {
                $state.go(currentStateName, stateParamsObj);
            } else {
                $state.go('home', stateParamsObj);
            }
        }

        /*
        *   createStates is a private method
        *   Description:
        *   createStates method is a recursive method, which recursively iterates through the items tree and
        *   creates the corresponding states.
        */
        function createStates(items, parentStateName) {
            if (!(items instanceof Array)) {
                return;
            }

            items.filter(function(statesInfoItem) {
                var stateName = parentStateName ? parentStateName + '.' + statesInfoItem.id : statesInfoItem.id;

                if (!isStateExist(stateName)) {
                    /*  pushes full stateName into the statesInfoItem of the items Array.
                    *   So that this can be available to header template or any page for link
                    */
                    var state = {
                        name: stateName,
                        url: '/' + statesInfoItem.id
                    };

                    if (statesInfoItem.templateUrl) {
                        state.templateProvider = ['$templateCache', function($templateCache) {
                            return $templateCache.get(statesInfoItem.templateUrl);
                        }];
                    }
                    if (statesInfoItem.controllerName) {
                        state.controller = statesInfoItem.controllerName;
                    }

                    if (statesInfoItem.queryParams instanceof Array) {
                        var params = statesInfoItem.queryParams.join('&');
                        state.url += '?' + params;
                    }

                    window.$stateProviderRef.state(state);
                }
                statesInfoItem.stateName = stateName;
                createStates(statesInfoItem.items, stateName);
            });
        }

        return {
            createStates: createStates,
            isStateExist: isStateExist,
            loadCurrentOrDefaultState: loadCurrentOrDefaultState

        };
	};
	stateHelperService.$inject = ['$state', '$location'];
    module.exports = stateHelperService;
})();
