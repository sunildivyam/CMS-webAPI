using CMS_webAPI.Models;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Newtonsoft.Json;
using System;
using System.Dynamic;

namespace CMS_webAPI.AppCode
{
    public class ArticlesService
    {
        /// /articles/{categoryName}        
        public static void SetMetaArticleByCategoryPage(string endPointUrl, string canonicalEndPointUrl, ViewDataDictionary ViewData)
        {
            string baseApiUrl = (string)ViewData["baseApiUrl"];
            string categoryResponse = AppService.RunExternalAPI(baseApiUrl, endPointUrl);
            if (String.IsNullOrEmpty(categoryResponse) == false)
            {
                dynamic category = new ExpandoObject();
                category = JsonConvert.DeserializeObject(categoryResponse);

                MetaInfoModel metaInfo = new MetaInfoModel();
                metaInfo.Title = category.Title + " | " + ViewData["baseTitle"];
                metaInfo.Description = category.Description;
                metaInfo.Keywords = category.Title + ", articles, Learn Wise Way";
                metaInfo.Tags = new string[] { category.Title, "articles", "Learn Wise Way"};
                metaInfo.Type = "Article";
                metaInfo.CanonicalUrl = ViewData["baseWebUrl"] + "/" + canonicalEndPointUrl;
                metaInfo.PageImage = ViewData["baseWebUrl"] + "/images/slideimages/" + category.Name + ".jpg";
                metaInfo.PageImageAlt = category.Title;
                metaInfo.TwitterAuthorHandle = (string)ViewData["twitterSiteHandle"];

                AppService.SetMetaInfoView(metaInfo, ViewData);
                ViewData["currentCategory"] = category;
            } else
            {                
                ViewData["currentCategory"] = null;
            }
            
        }

        /// /articles/{categoryName}/{articleId}/{articleName}        
        public static void SetMetaArticlePage(string endPointUrl, string canonicalEndPointUrl, ViewDataDictionary ViewData)
        {
            string baseApiUrl = (string)ViewData["baseApiUrl"];
            string articleResponse = AppService.RunExternalAPI(baseApiUrl, endPointUrl);
            if (String.IsNullOrEmpty(articleResponse) == false)
            {
                dynamic article = new ExpandoObject();
                article = JsonConvert.DeserializeObject(articleResponse);

                MetaInfoModel metaInfo = new MetaInfoModel();
                metaInfo.Title = article.Title + " | " + article.Category.Title + " | " + ViewData["baseTitle"];
                metaInfo.Description = AppService.StripHtml((string)article.ShortDescription);
                metaInfo.Keywords = AppService.GetKeywordsFromTags(article.Tags);
                metaInfo.Tags = AppService.GetMetaTagsFromTags(article.Tags);
                metaInfo.Type = "Article";
                metaInfo.AuthorName = article.Owner.UserName;
                metaInfo.TwitterAuthorHandle = article.Owner.Twitter;
                metaInfo.TwitterAuthorHandle = (string)ViewData["twitterSiteHandle"];
                metaInfo.PageImage = ViewData["baseApiUrl"] + "/" + ViewData["articleImageApiUrl"] + "/" + article.ContentId + "/" + article.Name;
                metaInfo.PageImageAlt = article.Title;
                metaInfo.PublishedDate = article.PublishedDate.ToString();
                metaInfo.UpdatedDate = article.PublishedDate.ToString();
                metaInfo.CanonicalUrl = ViewData["baseWebUrl"] + "/" + canonicalEndPointUrl;

                AppService.SetMetaInfoView(metaInfo, ViewData);
                ViewData["currentArticle"] = article;
            }
            else
            {
                ViewData["currentArticle"] = null;
            }
        }
        
    }
}
