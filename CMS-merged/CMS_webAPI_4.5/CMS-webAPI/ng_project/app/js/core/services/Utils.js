'use strict';
/**
* @ngdoc service
* @name raiweb.core.service:Utils
* @description
*   Utils provides common usgae functional methods
*
*/

(function() {
    var Utils = function(appService, $q, metaInformationService, pageTitleService, appConfig) {
        var requestHeaders = {
            'Content-Type': 'application/json'
        };

        var listConfig = appConfig;

        /**
        * @ngdoc method
        * @name parseStringExt
        * @methodOf raiweb.core.service:Utils
        * @description
        * This removes the restricted characters from the string and replaces them with a space
        *
        * @param {string} str Source String
        * @param {separator} separator All apsecial characters and spaces are replaced by separator string
        * @param {boolean=} keepMultipleSpaces if true, will not remove multiple spaces and will replace them with separator
        *
        * @returns {string} returns a string, all special characters and spaces replaced with the separator string.
        */
        function parseStringExt(str, separator, keepMultipleSpaces) {
            if (!separator) separator = ' ';
            if (str) {
                str =  str.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ' ')
                .replace(keepMultipleSpaces === true ? ' ' : /\s\s+/g, ' ')
                .replace(/\s/g, separator)
                .replace(/--+/g, separator)
                .toLowerCase();
                if (str.startsWith(separator)) {
                    str = str.slice(1);
                }
                if (str.endsWith(separator)) {
                    str = str.slice(0, str.length-1);
                }
            }

            return str;
        }

        /*
        * @ngdoc method
        * @name filterByKeywords
        * @description

        Filter Objects of content, tag or category, for title to contain searchKeywords
        *   and returns tru or false if found/notfound.
        *   This should be used in filtering Array of above Objects
        */
        function filterByKeywords(content, searchKeywords) {
            if (!searchKeywords) return true;

            if (content && ((content.title && content.title.toLowerCase().search(searchKeywords.toLowerCase()) >= 0) || (content.name && content.name.toLowerCase().search(searchKeywords.toLowerCase()) >= 0) || (content.description && content.description.toLowerCase().search(searchKeywords.toLowerCase()) >= 0))) {
                return true;
            } else {
                return false;
            }
        }

        // Replaces Real API URL with API DUMMY URL from all Image/links in the content.
        function encodeContent(contentString){
            if (typeof contentString !== 'string' || !contentString) {
                return "";
            }
            var rgx = new RegExp(appService.getApiServerUrl() + '/', 'gi');
            var encodedContent = contentString.replace(rgx, appService.getApiServerDummyUrl());
            return encodedContent;
        }

        // Replaces API DUMMY URL with Real API URL from all Image/links in the content.
        function decodeContent(contentString) {
            if (typeof contentString !== 'string' || !contentString) {
                return "";
            }
            var rgx = new RegExp(appService.getApiServerDummyUrl(), 'gi');
            var decodedContent = contentString.replace(rgx, appService.getApiServerUrl() + '/');
            return decodedContent;
        }

        function getListConfigs() {
            var defferedObj = $q.defer();
            if (!listConfig) {
                var cache = true;
                var params = {};
                var url = '/data/list-config.json';
                appService.get(url, params, requestHeaders, cache).then(function(response) {
                    listConfig = response && response.data;
                    defferedObj.resolve(listConfig);
                }, function(rejection) {
                    listConfig = undefined;
                    defferedObj.reject(rejection);
                });
            } else {
                defferedObj.resolve(listConfig);
            }
            return defferedObj.promise;
        }

        function getListModes() {
            return angular.copy(listConfig && listConfig.viewModes);
        }

        function getListItemsTypes() {
            return angular.copy(listConfig && listConfig.itemsTypes);
        }

        function getListConfigOf(listName) {
            return angular.copy(listConfig && listConfig[listName]);
        }

        function getItemTypeOf(itemType) {
            return angular.copy(listConfig && listConfig.itemsTypes && listConfig.itemsTypes[itemType]);
        }

        function getPubContentListTypes() {
            return angular.copy(listConfig && listConfig.pubContentListTypes);
        }

        function getPubQuizListTypes() {
            return angular.copy(listConfig && listConfig.pubQuizListTypes);
        }

        function setMetaInfo(pageTitle, description, keywords) {
            if (!description) {
                metaInformationService.resetMetaDescription();
            } else {
                metaInformationService.setMetaDescription(description);
            }

            if (!keywords) {
                metaInformationService.resetMetaKeywords();
            } else {
                metaInformationService.setMetaKeywords(keywords);
            }

            pageTitleService.setPageTitle(pageTitle);
        }

        function getCategories() {
            return listConfig.categories;
        }

        function getDateRangePicker() {
            var dateRangePicker = {
                "ranges": {
                    "Today": [
                        new window.moment(),
                        new window.moment()
                    ],
                    "Yesterday": [
                        new window.moment().subtract(1, "days"),
                        new window.moment()
                    ],
                    "Last 7 Days": [
                        new window.moment().subtract(7, "days"),
                        new window.moment()
                    ],
                    "Last 30 Days": [
                        new window.moment().subtract(30, "days"),
                        new window.moment()
                    ],
                    "Last 2 Months": [
                        new window.moment().subtract(2, "months"),
                        new window.moment()
                    ],
                    "Last 3 Months": [
                        new window.moment().subtract(3, "months"),
                        new window.moment()
                    ]
                },
                "startDate": new window.moment().subtract(7, "days"),
                "endDate": new window.moment(),
                "maxDate": new window.moment()
            };

            listConfig.dateRangePicker = dateRangePicker;
            return listConfig.dateRangePicker;
        }


        function encodeQuestion(question) {            
            question.description = encodeContent(question.description);
            question.optionA = encodeContent(question.optionA);
            question.optionB = encodeContent(question.optionB);
            question.optionC = encodeContent(question.optionC);
            question.optionD = encodeContent(question.optionD);
            question.answerDescription = encodeContent(question.answerDescription);
            return question;
        }

        function decodeQuestion(question) {
            question.description = decodeContent(question.description);
            question.optionA = decodeContent(question.optionA);
            question.optionB = decodeContent(question.optionB);
            question.optionC = decodeContent(question.optionC);
            question.optionD = decodeContent(question.optionD);
            question.answerDescription = decodeContent(question.answerDescription);
            return question;
        }

        function encodeQuiz(quiz) {
            quiz.description = encodeContent(quiz.description);
            if (quiz.questions && quiz.questions.length) {
                quiz.questions.filter(function(question) {
                    question = encodeQuestion(question);
                });                
            }
            return quiz;
        }

        function decodeQuiz(quiz) {
            quiz.description = decodeContent(quiz.description);
            if (quiz.questions && quiz.questions.length) {
                quiz.questions.filter(function(question) {
                    question = decodeQuestion(question);
                });                
            }
            return quiz;
        }

        function encodeQuizs(quizs) {
            if (quizs instanceof Array && quizs.length) {
                quizs.filter(function(quiz) {
                    quiz = encodeQuiz(quiz);
                });
            }
            return quizs;
        }

        function decodeQuizs(quizs) {
            if (quizs instanceof Array && quizs.length) {
                quizs.filter(function(quiz) {
                    quiz = decodeQuiz(quiz);
                });
            }
            return quizs;
        }

        function encodeQuestions(questions) {
            if (questions instanceof Array && questions.length) {
                questions.filter(function(question) {
                    question = encodeQuestion(question);
                });
            }
            return questions;
        }

        function decodeQuestions(questions) {
            if (questions instanceof Array && questions.length) {
                questions.filter(function(question) {
                    question = decodeQuestion(question);
                });
            }
            return questions;
        }


        return {
            parseStringExt: parseStringExt,
            filterByKeywords: filterByKeywords,
            getListModes: getListModes,
            getListItemsTypes: getListItemsTypes,
            encodeContent: encodeContent,
            decodeContent: decodeContent,
            getListConfigs: getListConfigs,
            getListConfigOf: getListConfigOf,
            getItemTypeOf: getItemTypeOf,
            getPubContentListTypes: getPubContentListTypes,
            setMetaInfo: setMetaInfo,
            getCategories: getCategories,
            getDateRangePicker: getDateRangePicker,
            getPubQuizListTypes: getPubQuizListTypes,
            encodeQuiz: encodeQuiz,
            decodeQuiz: decodeQuiz,
            encodeQuestion: encodeQuestion,
            decodeQuestion: decodeQuestion,
            encodeQuizs: encodeQuizs,
            decodeQuizs: decodeQuizs,
            encodeQuestions: encodeQuestions,
            decodeQuestions: decodeQuestions
        };
    };

    Utils.$inject = ['appService', '$q', 'metaInformationService', 'pageTitleService', 'appConfig'];
    module.exports = Utils;
})();