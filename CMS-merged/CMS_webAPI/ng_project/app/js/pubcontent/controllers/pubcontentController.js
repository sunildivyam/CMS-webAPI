'use strict';
/*
*   pubcontentController
*   Description
*   pubcontentController controls the content page Level Scope Data.
*/

(function() {
    var pubcontentController = function($rootScope, $scope, $state, $timeout, appService, pubcontentService, modalService, Content, Tag, Category, EntityMapper, metaInformationService, pageTitleService, Utils) {
        $scope.currentContent = new Content();

        function getContent(categoryName, contentId, contentName) {
            $scope.isLoading = true;
            if (categoryName && contentId && contentName) {
                pubcontentService.getContent(categoryName, contentId, contentName).then(function(response) {
                    var content = new Content(response && response.data);
                    content.description = Utils.decodeContent(content.description);
                    $scope.currentContent = content;
                    $scope.isLoading = false;
                    // Sets Meta information for Page
                    Utils.setMetaInfo(content.title, content.shortDescription, content.tags);
                }, function(rejection) {
                    $scope.isLoading = false;
                    modalService.alert('md',
                    'No Content found',
                    'Reason/s: ' + (appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') || 'Content Not Found.') ,
                    'Go Back').result.then(function() {
                        $state.go('pub.articles', {n: $scope.currentCategory && $scope.currentCategory.name});
                    }, function() {
                        $state.go('pub.articles');
                    });
                });
            } else {
                //
            }
        }

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams/*, fromState , fromParams*/) {
            if (toState && toState.name && toParams) {
                Utils.getListConfigs().then(function() {                  
                    if(toState.name === 'pub.articles.content' && toParams.n && toParams.ci && toParams.cn) {
                        Utils.setMetaInfo(toParams.n);
                        $scope.setPageName('pubcontentPage');
                        getContent(toParams.n, toParams.ci, toParams.cn);
                    } else {
                        //
                    }
                });
            } else {
                //
            }
        });
    };

    pubcontentController.$inject = ['$rootScope', '$scope', '$state', '$timeout','appService', 'pubcontentService', 'modalService', 'Content', 'Tag', 'Category', 'EntityMapper', 'metaInformationService', 'pageTitleService', 'Utils'];
    module.exports = pubcontentController;
})();
