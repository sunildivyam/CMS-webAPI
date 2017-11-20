'use strict';
/*
*	pageMetaTagsService Service
*	Description
* 	pageMetaTagsService Service Privides Meta keywords and
*	Meta Description to the pages of the Application
*/
(function() {
	var pageMetaTagsService = function($rootScope, MetaInfo, pageTitleService, appService, metaInformationService) {
		function addUpdateOrRemoveMetaTag(tagName, contentValue, attrName, attrValue, targetAttrName) {
			var $el;
			var isTitleTag = true;

			var selector = ['head ', tagName].join('');
			if (attrName && attrValue) {
				selector = ['head ', tagName, '[', attrName, '="', attrValue, '"]' ].join('');
				isTitleTag  = false;
			}
			$el = $(selector);

			if($el && $el.length){
				if (!contentValue) {
					$el.remove();
					return false;
				}				
			} else {
				if (!contentValue) {					
					return false;
				}
				var elDomStr = ['<', tagName, ' ', attrName, '="' + attrValue + '">'].join('');
				if(isTitleTag) {
					elDomStr = ['<', tagName, '></', tagName, '>'].join('');
				}
				$el = $(elDomStr);
				$('head').append($el);
			}

			if (isTitleTag) {
				$el.text(contentValue);
			} else {
				$el.attr(targetAttrName || 'content', contentValue);
			}
		}
				
		function refreshPageMetaInfo(metaInfo) {
			addUpdateOrRemoveMetaTag('title', metaInfo.title);
			addUpdateOrRemoveMetaTag('meta', metaInfo.description, 'name', 'description');
			addUpdateOrRemoveMetaTag('meta', metaInfo.keywords, 'name', 'keywords');
			addUpdateOrRemoveMetaTag('meta', metaInfo.title, 'itemprop', 'name');
			addUpdateOrRemoveMetaTag('meta', metaInfo.description, 'itemprop', 'description');
			addUpdateOrRemoveMetaTag('meta', metaInfo.image, 'itemprop', 'image');
			addUpdateOrRemoveMetaTag('meta', metaInfo.title, 'property', 'og:title');
			addUpdateOrRemoveMetaTag('meta', metaInfo.description, 'property', 'og:description');
			addUpdateOrRemoveMetaTag('meta', metaInfo.canonical, 'property', 'og:url');
			addUpdateOrRemoveMetaTag('link', metaInfo.canonical, 'rel', 'canonical', 'href');
			addUpdateOrRemoveMetaTag('meta', metaInfo.type, 'property', 'og:type');
			addUpdateOrRemoveMetaTag('meta', metaInfo.publishedDate, 'property', 'og:article:published_time');
			addUpdateOrRemoveMetaTag('meta', metaInfo.updatedDate, 'property', 'og:article:modified_time');
			addUpdateOrRemoveMetaTag('meta', metaInfo.author, 'property', 'og:article:author');
			addUpdateOrRemoveMetaTag('meta', metaInfo.image, 'property', 'og:image');
			addUpdateOrRemoveMetaTag('meta', metaInfo.imageAlt, 'property', 'og:image:alt');
			addUpdateOrRemoveMetaTag('meta', metaInfo.description, 'name', 'twitter:card');
			addUpdateOrRemoveMetaTag('meta', metaInfo.twitterSiteHandle, 'name', 'twitter:site');
			addUpdateOrRemoveMetaTag('meta', metaInfo.title, 'name', 'twitter:title');
			addUpdateOrRemoveMetaTag('meta', metaInfo.description, 'name', 'twitter:description');
			addUpdateOrRemoveMetaTag('meta', metaInfo.twitterAuthorHandle, 'name', 'twitter:creater');
			addUpdateOrRemoveMetaTag('meta', metaInfo.image, 'name', 'twitter:image');
			addUpdateOrRemoveMetaTag('meta', metaInfo.facebookAppId, 'property', 'fb:app_id');
			//og:tags (Tag Array)
			var $ogArticleTagElements = $('head meta[property="og:article:tag"]');
			if ($ogArticleTagElements && $ogArticleTagElements.length) {
				$ogArticleTagElements.remove();
			}
			if (metaInfo.tags && metaInfo.tags.length) {
				var $head = $('head');
				metaInfo.tags.filter(function(tagValue) {
					if (tagValue) {
						$head.append(['<meta property="og:article:tag" content="', tagValue, '">' ].join(''));
					}					
				});
			}

			// Additional og:image meta tags
			if (metaInfo.image) {
				addUpdateOrRemoveMetaTag('meta', 'image/jpeg', 'property', 'og:image:type');
				addUpdateOrRemoveMetaTag('meta', '600', 'property', 'og:image:width');
				addUpdateOrRemoveMetaTag('meta', '400', 'property', 'og:image:height');
			} else {
				addUpdateOrRemoveMetaTag('meta', '', 'property', 'og:image:type');
				addUpdateOrRemoveMetaTag('meta', '', 'property', 'og:image:width');
				addUpdateOrRemoveMetaTag('meta', '', 'property', 'og:image:height');
			}
		}

		function stringifyTags(tags, isCommaSeparated) {			
			var tagsStrArray = [];
			if (tags && tags.length) {
				tags.filter(function(tag) {
					tagsStrArray.push(tag.title);
				});				
			}
			return isCommaSeparated ? tagsStrArray.join(',') || '' : tagsStrArray;
		}

		function removeHtmlTagsFromString(htmlStr) {
			htmlStr = htmlStr || '';
			htmlStr = htmlStr.replace(/&nbsp;/g, ' ');
			var tmp = document.createElement("DIV");
			tmp.innerHTML = htmlStr;
			//remove math-tex elements, code
			$(tmp).find('.math-tex').remove();
			var strippedHtml = tmp.textContent || tmp.innerText;
			strippedHtml = strippedHtml.replace(/\s+/g, ' ');
			return strippedHtml;
		}

		function setPubCategoryPageMetaInfo(category, allTags) {
			var metaInfo = new MetaInfo();
			var app = $rootScope.application;

			setSocialMediaIds(metaInfo, app);
			metaInfo.title = pageTitleService.setPageTitle(category.title);
			metaInfo.description = removeHtmlTagsFromString(category.description);
			metaInfo.keywords = stringifyTags(allTags, true);
			metaInfo.tags = stringifyTags(allTags);
			metaInfo.image = [appService.getCategoryImagesUrl(), category.categoryId, category.name].join('/'); 
			metaInfo.imageAlt = category.title;
			metaInfo.twitterSiteHandle = app.twitterSiteHandle;
			metaInfo.type = 'article';
			metaInfo.canonical = window.location.toString();
			
			refreshPageMetaInfo(metaInfo);
		}

		function setPubContentPageMetaInfo(content) {
			var metaInfo = new MetaInfo();
			var app = $rootScope.application;

			setSocialMediaIds(metaInfo, app);
			metaInfo.title = pageTitleService.setPageTitle(content.title + ' | ' + content.category.title);
			metaInfo.description = removeHtmlTagsFromString(content.shortDescription);
			metaInfo.keywords = stringifyTags(content.tags, true);
			metaInfo.tags = stringifyTags(content.tags);
			metaInfo.image = [appService.getArticleImagesUrl(), content.contentId, content.name].join('/'); 
			metaInfo.imageAlt = content.title;
			metaInfo.twitterSiteHandle = app.twitterSiteHandle;
			metaInfo.type = 'article';
			metaInfo.canonical = window.location.toString();
			
			metaInfo.author  = content.author.getFullName();
			metaInfo.publishedDate = content.updatedDate;
			metaInfo.updatedDate = content.updatedDate;
			metaInfo.twitterAuthorHandle = content.author.twitter;

			refreshPageMetaInfo(metaInfo);
		}

		function setPubQuizPageMetaInfo(quiz) {
			var metaInfo = new MetaInfo();
			var app = $rootScope.application;

			setSocialMediaIds(metaInfo, app);
			metaInfo.title = pageTitleService.setPageTitle(quiz.title + ' | Quizzes');
			metaInfo.description = removeHtmlTagsFromString(quiz.description);
			metaInfo.keywords = stringifyTags(quiz.tags, true);
			metaInfo.tags = stringifyTags(quiz.tags);
			metaInfo.image = [appService.getQuizImagesUrl(), quiz.quizId, quiz.name].join('/'); 
			metaInfo.imageAlt = quiz.title;
			metaInfo.twitterSiteHandle = app.twitterSiteHandle;
			metaInfo.type = 'article';
			metaInfo.canonical = window.location.toString();
			
			metaInfo.author  = quiz.author.getFullName();
			metaInfo.publishedDate = quiz.updatedDate;
			metaInfo.updatedDate = quiz.updatedDate;
			metaInfo.twitterAuthorHandle = quiz.author.twitter || '';

			refreshPageMetaInfo(metaInfo);
		}


		function setPageMetaInfo(title, description, tags /* Array of Tag Entity or comma Separated string*/) {
			var metaInfo = new MetaInfo();
			var app = $rootScope.application;

			setSocialMediaIds(metaInfo, app);
			metaInfo.title = pageTitleService.setPageTitle(title);
			if (description) {
				metaInfo.description = removeHtmlTagsFromString(description);
			} else {
				metaInfo.description = removeHtmlTagsFromString(
					metaInformationService.resetMetaDescription()
				);
			}
			
			if (tags instanceof Array) {
				metaInfo.keywords = stringifyTags(tags, true);
				metaInfo.tags = stringifyTags(tags);
			} else {
				if (!tags) {
					tags = metaInformationService.resetMetaKeywords();
				}
				metaInfo.keywords = tags || '';
				metaInfo.tags = (tags && tags.split(',')) || [];
			}
			metaInfo.twitterSiteHandle = app.twitterSiteHandle;
			metaInfo.canonical = window.location.toString();

			refreshPageMetaInfo(metaInfo);
		}

		function setSocialMediaIds(metaInfo, application) {
			metaInfo.facebookAppId = application.facebookAppId;
			return metaInfo;
		}

		return {
			setPubCategoryPageMetaInfo: setPubCategoryPageMetaInfo,
			setPubContentPageMetaInfo: setPubContentPageMetaInfo,
			setPubQuizPageMetaInfo: setPubQuizPageMetaInfo,
			setPageMetaInfo: setPageMetaInfo
		};
	};
	pageMetaTagsService.$inject = ['$rootScope', 'MetaInfo', 'pageTitleService', 'appService', 'metaInformationService'];
	module.exports = pageMetaTagsService;
})();
