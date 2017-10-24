'use strict';
/*
*   pubquestionController
*   Description
*   pubquestionController controls the Question page Level Scope Data.
*/

(function() {
    var pubquestionController = function($rootScope, $scope, $state, $timeout, appService, pubcontentService, modalService, Quiz, Question, Tag, EntityMapper, metaInformationService, pageTitleService, Utils) {        
        $scope.questionInDiscussion = null;

        function getQuestion(questionId) {
            pubcontentService.getQuestion(questionId).then(function(response) {
                var question = new Question(response.data);
                question = Utils.decodeQuestion(question);
                $scope.questionInDiscussion = question;

                // This should be set only for quizs state, and not for quizs.quiz state
                if ($state.$current.name === 'pub.quizs') {
                    // Sets Meta information for Page
                    var title = "Quiz Question - " + $scope.questionInDiscussion.title;
                    var description = $scope.questionInDiscussion.description;
                    Utils.setMetaInfo(title, description, $scope.questionInDiscussion.tags);
                }
                $scope.isLoading = false;
            }, function() {
                $scope.isLoading = false;
                modalService.alert('md',
                'No Question found',
                'Reason/s: ' + (appService.getErrorMessage(rejection && rejection.data && rejection.data.ModelState, 'li') || 'Question Not Found.') ,
                "Go Home", 'Go Back to Quizzes').result.then(function() {                    
                    $state.go('pub');
                }, function() {
                    $state.go('pub.quizs');
                });
            });
        }

        $scope.$on('$stateChangeSuccess', function(event, toState, toParams/*, fromState , fromParams*/) {
            if (toState && toState.name) {
                Utils.getListConfigs().then(function() {                   
                    if(toState.name === 'pub.quizs.question' && toParams.qi) {
                        Utils.setMetaInfo();
                        $scope.setPageName('pubquestionPage');
                        getQuestion(toParams.qi);
                    }
                });
            }
        });
    };

    pubquestionController.$inject = ['$rootScope', '$scope', '$state', '$timeout','appService', 'pubcontentService', 'modalService', 'Quiz', 'Question', 'Tag', 'EntityMapper', 'metaInformationService', 'pageTitleService', 'Utils'];
    module.exports = pubquestionController;
})();
