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

		return {
			parseStringExt: parseStringExt
		};
	};

	Utils.$inject = [];
	module.exports = Utils;
})();