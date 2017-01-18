'use strict';
/*
*	ContentResource
*	Description
*	ContentResource is Content ContentResource
*/

(function() {
	var ContentResource = function(Category, User) {
		function ContentResource(raw) {
			if (raw instanceof Object) {
				this.contentResourceId = raw.ContentResourceId;
				this.name = raw.Name;
				this.resourceData = raw.ResourceData;
				this.resourceThumbnail = raw.ResourceThumbnail;
				this.updatedDate = raw.UpdatedDate ? new Date(raw.UpdatedDate) : undefined;
				this.category = new Category(raw.Category);
				this.owner = new User(raw.Owner);
				this.size = raw.Size;
				this.extension  = raw.Extension;
			}
		}

		ContentResource.prototype = {

		};
		return ContentResource;
	};

	ContentResource.$inject = ['Category', 'User'];
	module.exports = ContentResource;
})();
