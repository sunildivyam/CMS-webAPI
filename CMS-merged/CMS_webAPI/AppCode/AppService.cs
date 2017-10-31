using CMS_webAPI.Models;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;

namespace CMS_webAPI
{
    public class AppService
    {
        public static string APP_CONFIG_JSON_PATH = "wwwroot/data/list-config.json";

        public static void PopulateAppConfig(ViewDataDictionary ViewData, dynamic ViewBag)
        {
            string configJsonStr = System.IO.File.ReadAllText(Path.GetFullPath(APP_CONFIG_JSON_PATH));
            dynamic configJsonObj = new ExpandoObject();
            configJsonObj = JsonConvert.DeserializeObject(configJsonStr);

            string categories = "[]";
            string apiUrl = configJsonObj.application.apiUrl;
            string categoriesEndpointUrl = "api/categories/getCategories";

            // Get all categories
            categories = RunExternalAPI(apiUrl, categoriesEndpointUrl);

            configJsonObj.categories = JsonConvert.DeserializeObject(categories);

            // Common Properties Available across Page
            ViewData["appConfig"] = configJsonObj;
            ViewData["baseApiUrl"] = apiUrl;
            ViewData["baseWebUrl"] = configJsonObj.application.url;
            ViewData["baseTitle"] = configJsonObj.application.shortTitle;
            ViewData["articleImageApiUrl"] = "api" + configJsonObj.application.articleImages;
            ViewData["quizImageApiUrl"] = "api" + configJsonObj.application.quizImages;
            ViewData["twitterSiteHandle"] = configJsonObj.application.twitterSiteHandle;

            MetaInfoModel metaInfo = new MetaInfoModel();

            //Default Page Properties
            metaInfo.Title = (string)configJsonObj.application.shortTitle + "-" + (string)configJsonObj.application.title;
            metaInfo.Description = configJsonObj.application.description;
            metaInfo.Keywords = configJsonObj.application.keywords;

            SetMetaInfoView(metaInfo, ViewData);

            ViewBag.BodyImageUrl = configJsonObj.application.bodyImageUrl;
            ViewBag.BodyImageSize = configJsonObj.application.bodyImageSize;
        }

        /// <summary>
        /// This Returns a response in string enclosed JSON response from an External API
        /// </summary>
        /// <param name="baseApiUrl"></param>
        /// <param name="endPointUrl"></param>
        /// <returns></returns>
        public static string RunExternalAPI(string baseApiUrl, string endPointUrl)
        {
            HttpClient dataClient = new HttpClient();
            dataClient.BaseAddress = new Uri(baseApiUrl);
            dataClient.DefaultRequestHeaders.Accept.Clear();
            dataClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            dataClient.DefaultRequestHeaders.UserAgent.ParseAdd("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36");
            HttpResponseMessage response = dataClient.GetAsync(endPointUrl).Result;
            if (response.IsSuccessStatusCode)
            {
                return response.Content.ReadAsStringAsync().Result;
            }

            return "";
        }

        public static void SetMetaInfoView(MetaInfoModel metaInfo, ViewDataDictionary ViewData)
        {
            ViewData["title"] = metaInfo.Title;
            ViewData["description"] = metaInfo.Description;
            ViewData["keywords"] = metaInfo.Keywords;
            ViewData["image"] = metaInfo.PageImage;
            ViewData["canonical"] = metaInfo.CanonicalUrl;
            ViewData["author"] = metaInfo.AuthorName;
            ViewData["image"] = metaInfo.PageImage;
            ViewData["imageAlt"] = metaInfo.PageImageAlt;
            ViewData["publishedDate"] = metaInfo.PublishedDate;
            ViewData["updatedDate"] = metaInfo.UpdatedDate;
            ViewData["tags"] = metaInfo.Tags;
            ViewData["twitterAuthorHandle"] = metaInfo.TwitterAuthorHandle;
            ViewData["twitterSiteHandle"] = metaInfo.TwitterSiteHandle;
            ViewData["type"] = metaInfo.Type;
        }

        public static string GetKeywordsFromTags(dynamic tags)
        {
            string keywords = "";
            if (tags != null && tags.Count > 0)
            {
                int tagsCount = tags.Count;
                for (int i = 0; i < tagsCount; i++)
                {
                    keywords = keywords + tags[i].Title + (i < (tagsCount - 1) ? "," : "");
                }
            }
            return keywords;
        }

        public static string[] GetMetaTagsFromTags(dynamic tags)
        {
            List<string> keywords = new List<string>();
            if (tags != null && tags.Count > 0)
            {
                int tagsCount = tags.Count;
                for (int i = 0; i < tagsCount; i++)
                {
                    keywords.Add((string)tags[i].Title);
                }
            }
            return keywords.ToArray();
        }

        public static string StripHtml(string html)
        {
            if (String.IsNullOrEmpty(html))
            {
                return "";
            }
            html.Replace("&nbsp;", " ");
            HtmlDocument htmlDoc = new HtmlDocument();
            htmlDoc.LoadHtml(html);            
            return htmlDoc.DocumentNode.InnerText;
        }
    }
}
