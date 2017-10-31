'use strict';
/*
*   pubTagController
*   Description
*   pubTagController handles the search Functionality.
*/

(function() {
    var pubTagController = function($rootScope, $scope, pubcontentService, metaInformationService, pageTitleService, EntityMapper, Content, Tag, Utils, Quiz, Question, pageMetaTagsService) {
        $scope.dlContentsListOfTag = {};
        $scope.currentTag = new Tag();
        $scope.tagEntityName = getTagEntityType('quizzes');
        $scope.tagType = 'articles';

        function getConfigName(tagType) {
            if (tagType === 'articles') {
                return 'pubtag';
            } else if (tagType === 'quizzes') {
                return 'pubQuiz';
            } else if (tagType === 'questions') {
                return 'question';
            }
            return 'pubtag';
        }

        function getTagEntityType(tagType) {
            if (tagType === 'articles') {
                return 'Content';
            } else if (tagType === 'quizzes') {
                return 'Quiz';
            } else if (tagType === 'questions') {
                return 'Question';
            }
            return 'Content';
        }

        function getTagEntityTypeObject(tagEntityTypeName) {
            if (tagEntityTypeName === 'Content') {
                return Content;
            } if (tagEntityTypeName === 'Quiz') {
                return Quiz;
            } else if (tagEntityTypeName === 'Question') {
                return Question;
            }
            return Content;
        }

        function getSearchResultsTags(searchResults) {
            var tags = [];
            if (searchResults && searchResults.length) {
                searchResults.filter(function(article) {
                    tags = tags.concat(article.tags);
                });
            }
            return tags;
        }

        function  initTagContentListWithResults(searchResults) {
            if(searchResults instanceof Object) {
                $scope.currentTag = new Tag(searchResults.Tag);
                var items = new EntityMapper(getTagEntityTypeObject($scope.tagEntityName)).toEntities(searchResults[$scope.tagEntityName + 's']);
                if ($scope.tagEntityName === "Quiz" || $scope.tagEntityName === "Question") {
                    items = Utils['decode' + $scope.tagEntityName + 's'](items);
                }
                
                $scope.dlContentsListOfTag.items = items;
                $scope.dlContentsListOfTag.pagingTotalItems = searchResults.TotalCount;
                $scope.dlContentsListOfTag.headerRightLabel = searchResults.TotalCount + " results";
                $scope.dlContentsListOfTag.headerTitle = $scope.tagType + '-' + $scope.currentTag.title;
                $scope.dlContentsListOfTag.headerSummary = $scope.tagType + ' related to keyword "' + $scope.currentTag.title +'"';
                // Sets Meta information for Page
                pageMetaTagsService.setPageMetaInfo(
                    [$scope.baseTitle, $scope.currentTag.title].join(' '),
                    $scope.currentTag.description,
                    pubcontentService.getUniqueTagsOfTags(getSearchResultsTags($scope.dlContentsListOfTag.items)));
            } else {
                $scope.currentTag = new Tag();
                $scope.dlContentsListOfTag.items = undefined;
                $scope.dlContentsListOfTag.pagingTotalItems = 0;
                $scope.dlContentsListOfTag.headerRightLabel = "0 results";
            }
        }

        function getSearchResults(tagId, tagName, pageNo) {
            $scope.isTagLoading = true;
            $scope.dlContentsListOfTag.isLoading = true;
            $scope.dlContentsListOfTag = angular.extend(Utils.getListConfigOf(getConfigName($scope.tagType)), $scope.dlContentsListOfTag);

            var tagContentListFn = pubcontentService['get' + $scope.tagEntityName + 'sByTag'];

            tagContentListFn(tagId, tagName, pageNo, $scope.dlContentsListOfTag.pagingPageSize).then(function(response) {
                if (response && response.data) {
                    initTagContentListWithResults(response.data);
                } else {
                    initTagContentListWithResults();
                }
                $scope.dlContentsListOfTag.isLoading = false;
                $scope.isTagLoading = false;
            }, function() {
                initTagContentListWithResults();
                $scope.dlContentsListOfTag.isLoading = false;
                $scope.isTagLoading = false;
            });
        }

        $scope.dlContentsListOfTag.onPagingPageChange = function(event, pageNo) {
            if (pageNo && pageNo > 0 && $rootScope && $rootScope.$stateParams && $rootScope.$stateParams.ti && $rootScope.$stateParams.tn) {
                var ti =  $rootScope.$stateParams.ti;
                var tn = $rootScope.$stateParams.tn;
                getSearchResults(ti, tn, pageNo);
            }
        };

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams) {
            if (toState) {
                // Sets Meta information for Page                
                $scope.baseTitle = toState.title;
            }

            if (toState && toState.name && toParams && toParams.ti && toParams.tn) {
                Utils.getListConfigs().then(function() {
                    $scope.tagEntityName = getTagEntityType(toParams.tt);
                    $scope.tagType = toParams.tt;
                    getSearchResults(toParams.ti, toParams.tn, 1);
                }, function(rejection) {
                    //
                });
            }
        });
    };

    pubTagController.$inject = ['$rootScope', '$scope', 'pubcontentService', 'metaInformationService', 'pageTitleService', 'EntityMapper', 'Content', 'Tag', 'Utils', 'Quiz', 'Question', 'pageMetaTagsService'];
    module.exports = pubTagController;
})();
