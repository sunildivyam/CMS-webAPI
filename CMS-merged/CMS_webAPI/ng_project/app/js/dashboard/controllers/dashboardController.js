'use strict';
/*
*   dashboardController
*   Description
*   dashboardController controls the dashboard page Level Scope Data.
*/

(function() {
    var dashboardController = function($rootScope, $scope, $state, $timeout, metaInformationService, pageTitleService, contentService, EntityMapper, Content, Category, Tag, Quiz, modalService, Utils) {
        $scope.dlCategories = {};
        $scope.dlTags = {};
        $scope.dlDraftedContents = {};
        $scope.dlPublishedContents = {};
        $scope.dlDraftedQuizs = {};
        $scope.dlPublishedQuizs = {};
        $scope.dlContentHistory= {};


        $scope.getDraftedQuizs = function() {
            $scope.dlDraftedQuizs.isLoading = true;
            $scope.dlDraftedQuizs = angular.extend(Utils.getListConfigOf('draftedQuiz'), $scope.dlDraftedQuizs);

            contentService.getDraftedQuizs().then(function(response) {
                var quizs = new EntityMapper(Quiz).toEntities(response.data);
                quizs = Utils.decodeQuizs(quizs);
                
                $scope.dlDraftedQuizs.items = quizs;
                $scope.dlDraftedQuizs.pagingTotalItems = quizs.length;
                $scope.dlDraftedQuizs.headerRightLabel = quizs.length + ' results';
                $scope.dlDraftedQuizs.isLoading = false;
            }, function() {
                $scope.dlDraftedQuizs.items = new EntityMapper(Quiz).toEntities([]);
                $scope.dlDraftedQuizs.pagingTotalItems = 0;
                $scope.dlDraftedQuizs.headerRightLabel = '0 results';
                $scope.dlDraftedQuizs.isLoading = false;
            });
        };


        $scope.getPublishedQuizs = function() {
            $scope.dlPublishedQuizs.isLoading = true;
            $scope.dlPublishedQuizs = angular.extend(Utils.getListConfigOf('publishedQuiz'), $scope.dlPublishedQuizs);
            contentService.getPublishedQuizs().then(function(response) {
                var quizs = new EntityMapper(Quiz).toEntities(response.data);
                quizs = Utils.decodeQuizs(quizs);

                $scope.dlPublishedQuizs.items = quizs;
                $scope.dlPublishedQuizs.pagingTotalItems = quizs.length;
                $scope.dlPublishedQuizs.headerRightLabel = quizs.length + ' results';
                $scope.dlPublishedQuizs.isLoading = false;
            }, function() {
                $scope.dlPublishedQuizs.items = new EntityMapper(Quiz).toEntities([]);
                $scope.dlPublishedQuizs.pagingTotalItems = 0;
                $scope.dlPublishedQuizs.headerRightLabel = '0 results';
                $scope.dlPublishedQuizs.isLoading = false;
            });
        };


        $scope.getDraftedContents = function() {
            $scope.dlDraftedContents.isLoading = true;
            $scope.dlDraftedContents = angular.extend(Utils.getListConfigOf('draftedContent'), $scope.dlDraftedContents);

            contentService.getDraftedContents().then(function(response) {
                var contents = new EntityMapper(Content).toEntities(response.data);
                $scope.dlDraftedContents.items = contents;
                $scope.dlDraftedContents.pagingTotalItems = contents.length;
                $scope.dlDraftedContents.headerRightLabel = contents.length + ' results';
                $scope.dlDraftedContents.isLoading = false;
            }, function() {
                $scope.dlDraftedContents.items = new EntityMapper(Content).toEntities([]);
                $scope.dlDraftedContents.pagingTotalItems = 0;
                $scope.dlDraftedContents.headerRightLabel = '0 results';
                $scope.dlDraftedContents.isLoading = false;
            });
        };

        $scope.getAvailableCategories = function() {
            $scope.dlCategories.isLoading = true;
            $scope.dlCategories = angular.extend(Utils.getListConfigOf('category'), $scope.dlCategories);
            contentService.getCategories().then(function(response) {
                var categories = new EntityMapper(Category).toEntities(response.data);
                $scope.dlCategories.items = categories;
                $rootScope.categories = categories;
                $scope.dlCategories.pagingTotalItems = categories.length;
                $scope.dlCategories.headerRightLabel = categories.length + ' results';
                $scope.dlCategories.isLoading = false;
            }, function() {
                $scope.dlCategories.items = new EntityMapper(Category).toEntities([]);
                $scope.dlCategories.pagingTotalItems = 0;
                $scope.dlCategories.headerRightLabel = '0 results';
                $scope.dlCategories.isLoading = false;
            });
        };

        $scope.getAvailableTags = function() {
            $scope.dlTags.isLoading = true;
            $scope.dlTags = angular.extend(Utils.getListConfigOf('tag'), $scope.dlTags);
            contentService.getTags().then(function(response) {
                var tags = new EntityMapper(Tag).toEntities(response.data);
                $scope.dlTags.items = tags;
                $scope.dlTags.pagingTotalItems = tags.length;
                $scope.dlTags.headerRightLabel = tags.length + ' results';
                $scope.dlTags.isLoading = false;
            }, function() {
                $scope.dlTags.items = new EntityMapper(Tag).toEntities([]);
                $scope.dlTags.pagingTotalItems = 0;
                $scope.dlTags.headerRightLabel = '0 results';
                $scope.dlTags.isLoading = false;
            });
        };

        $scope.getAvailablePublishedContents = function() {
            $scope.dlPublishedContents.isLoading = true;
            $scope.dlPublishedContents = angular.extend(Utils.getListConfigOf('publishedContent'), $scope.dlPublishedContents);
            contentService.getPublishedContents().then(function(response) {
                var contents = new EntityMapper(Content).toEntities(response.data);
                $scope.dlPublishedContents.items = contents;
                $scope.dlPublishedContents.pagingTotalItems = contents.length;
                $scope.dlPublishedContents.headerRightLabel = contents.length + ' results';
                $scope.dlPublishedContents.isLoading = false;
            }, function() {
                $scope.dlPublishedContents.items = new EntityMapper(Content).toEntities([]);
                $scope.dlPublishedContents.pagingTotalItems = 0;
                $scope.dlPublishedContents.headerRightLabel = '0 results';
                $scope.dlPublishedContents.isLoading = false;
            });
        };


        $scope.dlDraftedQuizs.onItemSelect = function(event, quiz) {
            if(quiz instanceof Object) {
                $state.go('author.quiz', {id: quiz.quizId});
            }
        };

        $scope.dlPublishedQuizs.onItemSelect = function(event, quiz) {
            if(quiz instanceof Object) {
                $state.go('author.quiz', {id: quiz.quizId});
            }
        };


        $scope.dlDraftedContents.onItemSelect = function(event, content) {
            if(content instanceof Object) {
                $state.go('author.content', {id: content.authorContentId});
            }
        };

        $scope.dlCategories.onItemSelect = function(event, category) {
            if(category instanceof Object) {
                $state.go('author.category', {id: category.categoryId});
            }
        };

        $scope.dlTags.onItemSelect = function(event, tag) {
            if(tag instanceof Object) {
                $state.go('author.tag', {id: tag.tagId});
            }
        };

        $scope.dlPublishedContents.onItemSelect = function(event, content) {
            $scope.dlContentHistory.isLoading = true;
            $scope.dlContentHistory = angular.extend(Utils.getListConfigOf('contentHistory'), $scope.dlContentHistory);
            var contentHistory = new EntityMapper(Content).toEntities();
            if (content && content.authorContentId) {
                contentService.getContentAuthoringHistory(content.contentId).then(function(response) {
                    contentHistory = new EntityMapper(Content).toEntities(response.data);
                    $scope.dlContentHistory.items = contentHistory;
                    $scope.dlContentHistory.pagingTotalItems = contentHistory.length;
                    $scope.dlContentHistory.headerRightLabel = contentHistory.length + ' results';
                    $scope.dlContentHistory.isLoading = false;
                    $scope.contentHistoryModal = modalService.showContentHistoryModal($scope.dlContentHistory, 'lg');
                }, function() {
                    contentHistory = new EntityMapper(Content).toEntities();
                    $scope.dlContentHistory.items = contentHistory;
                    $scope.dlContentHistory.pagingTotalItems = 0;
                    $scope.dlContentHistory.headerRightLabel = '0 results';
                    $scope.dlContentHistory.isLoading = false;
                    $scope.contentHistoryModal = modalService.showContentHistoryModal($scope.dlContentHistory, 'lg');
                });
            }
        };

        $scope.dlContentHistory.onItemSelect = function(event, content) {
            if(content instanceof Object && $scope.contentHistoryModal && $scope.contentHistoryModal.close) {
                $scope.contentHistoryModal.close();
                $state.go('author.content', {id: content.authorContentId});
            }
        };

        $scope.onListsRefresh = function() {
            $scope.refreshIsotopeLayout();
        };

        $scope.refreshIsotopeLayout =  function(elm) {
            if (!$scope.iso) {
                if (elm) {
                    $scope.iso = new Isotope(elm, {
                        "itemSelector": ".grid-item"
                    });
                }
            } else {
                $timeout(function() {
                    $scope.iso.layout();
                });
            }
        };

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState /*, fromParams*/) {
            if (toState && toState.name && (fromState && fromState.name !== toState.name)) {
                Utils.getListConfigs().then(function() {
                    $scope.iso = undefined;
                    $scope.getDraftedContents();
                    $scope.getAvailableCategories();
                    $scope.getAvailableTags();
                    $scope.getAvailablePublishedContents();
                    $scope.getDraftedQuizs();
                    $scope.getPublishedQuizs();
                });
            }
        });
    };

    dashboardController.$inject = ['$rootScope', '$scope', '$state', '$timeout', 'metaInformationService', 'pageTitleService', 'contentService', 'EntityMapper', 'Content', 'Category', 'Tag', 'Quiz', 'modalService', 'Utils'];
    module.exports = dashboardController;
})();
