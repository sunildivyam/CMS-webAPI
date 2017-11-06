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
				this.categoryId = raw.CategoryId;
				this.name = raw.Name;
				this.title = raw.Title;
				this.description = raw.Description;
			}
		}

		Category.prototype = {

		};
		return Category;
	};

	Category.$inject = [];
	module.exports = Category;
})();
