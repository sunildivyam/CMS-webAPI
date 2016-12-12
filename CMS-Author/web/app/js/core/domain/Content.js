'use strict';
/*
*	Content
*	Description
*	Content model is for content entity.
*/

(function() {
	var Content = function(EntityMapper, Tag, Category, User) {
		function Content(raw) {
			if (raw instanceof Object) {
				this.authorContentId = raw.AuthorContentId;
				this.contentId = raw.ContentId;
				this.name = raw.Name;
				this.title = raw.Title;
				this.shortDescription = raw.ShortDescription;
				this.description = raw.Description;
				this.author = new User(raw.Author);
				this.tags = new EntityMapper(Tag).toEntities(raw.Tags);
				this.category = new Category(raw.Category);
				this.publishedDate = new Date(raw.PublishedDate);
				this.updatedDate = new Date(raw.UpdatedDate);
				this.updateCount = raw.UpdateCount;
				this.isLive = raw.IsLive;
				this.owner = new User(raw.Owner);
				this.vistCount = raw.VisitCount;
			}
		}

		Content.prototype = {
			getFullName: function(isFirstNameFirst) {
				if (isFirstNameFirst === true) {
					return this.firstName & this.lastName ? ' ' + this.lastName: '';
				} else {
					return this.lastName & this.firstName ? ', ' + this.firstName: '';
				}
			}
		};
		return Content;
	};

	Content.$inject = ['EntityMapper', 'Tag', 'Category', 'User'];
	module.exports = Content;
})();
