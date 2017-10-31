'use strict';
/*
*   pubquizsController
*   Description
*   pubquizsController controls the Quiz page Level Scope Data.
*/

(function() {
    var pubquizsController = function($rootScope, $scope, $state, $timeout, appService, pubcontentService, modalService, Quiz, Question, Tag, EntityMapper, metaInformationService, pageTitleService, Utils, pageMetaTagsService) {        
        $scope.pageDescription = [
            'Retrieval aids later retention. There is clear evidence from psychological experiments that practicing retrieval of something after learning it, for instance by taking a quiz or test, makes you more likely to retain it for the long term.',
            'Quizzes identifies gaps in knowledge.',
            'Quizzes causes students to learn more from the next study episode. Essentially it reduces forgetting which makes the next related study area more productive.',
            'Quizzes produces better organization of knowledge by helping the brain organize material in clusters to allow better retrieval.',
            'Quizzes improves transfer of knowledge to new contexts. There are several experiments referenced in the paper where tests and quizzes help transfer and application of knowledge.',
            'Quizzes can facilitate retrieval of material that was not tested. Surprisingly there are circumstances where quizzes or tests, particularly if delayed, can help people retrieve/retain information that was related to that asked but not actually asked in the questions.',
            'Quizzes improves metacognitive monitoring – by giving students scores or self-assessments, they can better predict their knowledge and be more confident about what they know and what they need to know.',
            'Quizzes prevents interference from prior material when learning new material. If you have a test after learning one set of material before learning another set of material, it can make it less likely that the second session will',
            'Quizzes provides feedback to instructors and lets them know what is learned or what is not.',
            'Frequent testing encourages students to study. Having frequent quizzes and tests motivates study and reduces procrastination.'
        ].join(' ');
        $scope.dlPopular = {};
        $scope.dlLatest = {};
        $scope.dlRelevant = {};
        $scope.dlRelated = {};
        $scope.allQuizTags = []; // For Meta information
        
        function getAllQuizLists() {
            var quizListTypes = Utils.getPubQuizListTypes();
            $scope.dlQuizLists = [];
            $scope.allQuizTags = [];

            for (var key in quizListTypes) {
                (function() {
                    var dlQuizList = {};
                        dlQuizList.isLoading = true;
                        dlQuizList.enableFooterLink = false;
                        dlQuizList.headerTitle = quizListTypes[key].title;
                        dlQuizList.viewMode = quizListTypes[key].viewMode;
                        dlQuizList.tileViewClass = $state.$current.name==="pub.quizs.quiz" ? 'col-md-6' : quizListTypes[key].tileViewClass;
                        dlQuizList = angular.extend(Utils.getListConfigOf('pubQuiz'), dlQuizList);

                    $scope.dlQuizLists.push(dlQuizList);
                    getQuizs(dlQuizList, quizListTypes[key].sortField, quizListTypes[key].sortDirAsc, dlQuizList.pagingPageSize, dlQuizList.pagingSelectedPage);                    
                }());
            }
        }

        function getQuizs(dlQuizList, sortField, sortDirAsc, pagingPageSize, pagingSelectedPage) {
            pubcontentService.getQuizs(sortField, sortDirAsc, pagingPageSize, pagingSelectedPage).then(function(response) {
                if (response && response.data) {
                    var quizs = new EntityMapper(Quiz).toEntities(response.data.Quizs);
                    quizs = Utils.decodeQuizs(quizs);

                    dlQuizList.items = quizs;
                    dlQuizList.tags = pubcontentService.getUniqueTagsOfContents(quizs);
                    dlQuizList.pagingTotalItems = response.data.TotalCount;
                    dlQuizList.headerRightLabel = response.data.TotalCount + '+ quizzes';
                    dlQuizList.headerTitle = dlQuizList.headerTitle;
                    dlQuizList.footerLinkUrl = ['/search', 'quizzes'].join('/');
                    dlQuizList.onPagingPageChange = function(event, pageNo) {
                        getQuizs(dlQuizList, sortField, sortDirAsc, pagingPageSize, pageNo);
                    };
                } else {
                    dlQuizList.items = new EntityMapper(Quiz).toEntities([]);
                    dlQuizList.tags = [];
                    dlQuizList.pagingTotalItems = 0;
                    dlQuizList.headerRightLabel = '0 quizzes';
                }
                $scope.allQuizTags = $scope.allQuizTags.concat(dlQuizList.tags);

                // This should be set only for quizs state, and not for quizs.quiz state
                if ($state.$current.name === 'pub.quizs') {
                    // Sets Meta information for Page
                    pageMetaTagsService.setPageMetaInfo($state.$current.title, $scope.pageDescription, pubcontentService.getUniqueTagsOfTags($scope.allQuizTags));
                }

                dlQuizList.isLoading = false;
            }, function() {
                dlQuizList.items = new EntityMapper(Content).toEntities([]);
                dlQuizList.tags = [];
                dlQuizList.pagingTotalItems = 0;
                dlQuizList.headerRightLabel = '0 quizzes';
                dlQuizList.isLoading = false;
            });
        }

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams/*, fromState , fromParams*/) {
            if (toState && toState.name) {
                Utils.getListConfigs().then(function() {
                    getAllQuizLists();
                    if (toState.name === "pub.quizs") {
                        $scope.setPageName('pubquizsPage');
                    }
                });
            } else {
                //
            }
        });
    };

    pubquizsController.$inject = ['$rootScope', '$scope', '$state', '$timeout','appService', 'pubcontentService', 'modalService', 'Quiz', 'Question', 'Tag', 'EntityMapper', 'metaInformationService', 'pageTitleService', 'Utils', 'pageMetaTagsService'];
    module.exports = pubquizsController;
})();
