'use strict';
/**
* @ngdoc service
* @name raiweb.core.service:Utils
* @description
*	Utils provides common usgae functional methods
*
*/

(function() {
	var Utils = function() {
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
				return str.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ' ')
				.replace(keepMultipleSpaces === true ? ' ' : /\s\s+/g, ' ')
				.replace(/\s/g, separator)
				.toLowerCase();
			}

			return str;
		}

		/* 	Filter Objects of content, tag or category, for title to contain searchKeywords
		*	and returns tru or false if found/notfound.
		*	This should be used in filtering Array of above Objects
		*/
		function filterByKeywords(content, searchKeywords) {
			if (!searchKeywords) return true;

			if (content && content.title && content.title.toLowerCase().search(searchKeywords.toLowerCase()) >= 0) {
				return true;
			} else {
				return false;
			}
		}

		return {
			parseStringExt: parseStringExt,
			filterByKeywords: filterByKeywords
		};
	};

	Utils.$inject = [];
	module.exports = Utils;
})();