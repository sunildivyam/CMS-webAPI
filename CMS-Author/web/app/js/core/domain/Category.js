'use strict';
/*
*	Category
*	Description
*	Category is Content Category
*/

(function() {
	var Category = function() {
		function Category(raw) {
			if (raw instanceof Object) {
				this.id = raw.id;
				this.title = raw.title;
				this.description = raw.description;
			}
		}

		Category.prototype = {

		};
		return Category;
	};

	Category.$inject = [];
	module.exports = Category;
})();
