'use strict';
/*
*	metaInformationService Service
*	Description
* 	metaInformationService Service Privides Meta keywords and
*	Meta Description to the pages of the Application
*/
(function() {
	var metaInformationService = function($rootScope) {
		var metaKeywords = '';
		var metaDescription = '';
		var application = $rootScope && $rootScope.appHeader && $rootScope.appHeader.application || {};
		/*
		*	getMetaKeywords() method returns the Meta Keywords
		*/

		function getMetaKeywords() {
			return metaKeywords;
		}

		/*
		*	getMetaDescription() method returns the Meta Description
		*/

		function getMetaDescription() {
			return metaDescription;
		}

		/*
		*	appendMetaKeywords() method appends the keywords to metaKeyWords
		*	keyword param can be string or array of strings.
		*	any other type of value, resets the metaKeywords
		*/

		function setMetaKeywords(keywords) {
			if (typeof keywords === 'string') {
				metaKeywords = keywords;
			} else if(keywords instanceof Array) {
				metaKeywords = keywords.join(',');
			} else {
				metaKeywords = '';
			}
		}

		/*
		*	setMetaDescription() method sets the metaDescription
		*	description param can be string only, anyother type, resets metaDescription
		*/

		function setMetaDescription(description) {
			if (typeof description === 'string') {
				metaDescription = description;
			} else {
				metaDescription = '';
			}
		}

		/*
		*	resetMetaKeywords() method Resets the metaKeyWords
		*/

		function resetMetaKeywords() {
			setMetaKeywords(application.keywords);
		}

		/*
		*	resetMetaDescription() method Resets the metaDescription
		*/

		function resetMetaDescription() {
			setMetaDescription(application.description);
		}

		/*
		*	reset() method Resets the metaKeyWords and metaDescription
		*/

		function reset() {
			setMetaKeywords(application.keywords);
			setMetaDescription(application.description);
		}

		return {
			getMetaKeywords: getMetaKeywords,
			getMetaDescription: getMetaDescription,
			setMetaKeywords: setMetaKeywords,
			setMetaDescription: setMetaDescription,
			resetMetaKeywords: resetMetaKeywords,
			resetMetaDescription: resetMetaDescription,
			reset: reset
		};
	};
	metaInformationService.$inject = ['$rootScope'];
	module.exports = metaInformationService;
})();
