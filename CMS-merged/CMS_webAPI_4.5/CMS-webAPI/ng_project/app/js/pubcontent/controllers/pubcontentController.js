'use strict';
/*
*   pubcontentController
*   Description
*   pubcontentController controls the content page Level Scope Data.
*/

(function() {
    var pubcontentController = function($rootScope, $scope, $state, $timeout, appService, pubcontentService, modalService, Content, Tag, Category, EntityMapper, metaInformationService, pageTitleService, Utils, pageMetaTagsService) {
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
                    pageMetaTagsService.setPubContentPageMetaInfo(content);                    
                }, function(rejection) {
                    $scope.isLoading = false;
                    modalService.alert('md',
                    'No Content found',
                    'Reason/s: ' + (appService.getErrorMessage(rejection) || 'Content Not Found.') ,
                    'Go Back').result.then(function() {
                        var categoryName = $scope.currentCategory && $scope.currentCategory.name;
                        if (categoryName) {
                            $state.go('pub.articles', {n: categoryName});
                        } else {
                            $state.go('pub');
                        }                        
                    }, function() {
                        $state.go('pub');
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

    pubcontentController.$inject = ['$rootScope', '$scope', '$state', '$timeout','appService', 'pubcontentService', 'modalService', 'Content', 'Tag', 'Category', 'EntityMapper', 'metaInformationService', 'pageTitleService', 'Utils', 'pageMetaTagsService'];
    module.exports = pubcontentController;
})();
