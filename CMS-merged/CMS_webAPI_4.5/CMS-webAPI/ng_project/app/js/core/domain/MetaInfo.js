'use strict';
/*
*       MetaInfo
*       Description
*       MetaInfo model is for MetaInfo entity.
*/

(function() {
        var MetaInfo = function() {
                function MetaInfo(raw) {
                        if (raw instanceof Object) {
                                this.title = raw.title || "";
                                this.description = raw.description || "";
                                this.keywords = raw.keywords || "";
                                this.tags = raw.tags || [];
                                this.image = raw.image || "";
                                this.imageAlt = raw.imageAlt || "";
                                this.type = raw.type || "";
                                this.publishedDate = raw.publishedDate || "";
                                this.updatedDate = raw.updatedDate || "";
                                this.author = raw.author || "";
                                this.canonical = raw.canonical || "";
                                this.twitterSiteHandle = raw.twitterSiteHandle || "";
                                this.twitterAuthorHandle = raw.twitterAuthorHandle || "";
                                this.facebookAppId = raw.facebookAppId || "";
                        }
                }

                MetaInfo.prototype = {                  
                };
                return MetaInfo;
        };

        MetaInfo.$inject = [];
        module.exports = MetaInfo;
})();
