'use strict';
/*
*   requestInterceptor
*   Description
*   requestInterceptor intercepts are responses and error responses and
*   redirects to respective Error Pages
*/

(function() {
    var requestInterceptor = function($rootScope, $q, $injector) {
        //var IGNORED_ERRORS = [400, 403, 401];

        function request(config) {
            var accountService = $injector.get('accountService');

            if (!accountService.isAnonymous()) {
                config.headers['Authorization'] = 'Bearer ' + accountService.getToken();
            }
            return config;
        }

        function requestError(rejection) {
            return rejection;
        }

        function response(response) {
            return response;
        }

        function responseError(rejection) {
            //redirectOnError(rejection);
            return $q.reject(rejection);
        }

        // function redirectOnError(res) {
        //     var isByPassError = false;
        //     IGNORED_ERRORS.filter(function(error) {
        //         if (error === res.status) {
        //             isByPassError = true;
        //             return;
        //         }
        //     });

        //     if(isByPassError === false) {
        //         $rootScope.errorState = {
        //             'status': res.status,
        //             'statusText': res.statusText
        //         };
        //         $rootScope.$state.go('error');
        //     } else {
        //         $rootScope.errorState = {
        //             'status': null,
        //             'statusText': null
        //         };
        //     }
        // }

        return {
            request: request,
            requestError: requestError,
            response: response,
            responseError: responseError
        };
    };

    requestInterceptor.$inject = ['$rootScope', '$q', '$injector'];
    module.exports = requestInterceptor;
})();
