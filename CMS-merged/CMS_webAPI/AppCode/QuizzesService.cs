using CMS_webAPI.Models;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;

namespace CMS_webAPI.AppCode
{
    public class QuizzesService
    {
        /// /quizzes/{"quiz"}/{quizId}/{quizName}        
        public static void SetMetaQuizPage(string endPointUrl, string canonicalEndPointUrl, ViewDataDictionary ViewData)
        {
            string baseApiUrl = (string)ViewData["baseApiUrl"];
            string quizResponse = AppService.RunExternalAPI(baseApiUrl, endPointUrl);
            if (String.IsNullOrEmpty(quizResponse) == false)
            {
                dynamic quiz = new ExpandoObject();
                quiz = JsonConvert.DeserializeObject(quizResponse);

                MetaInfoModel metaInfo = new MetaInfoModel();
                metaInfo.Title = quiz.Title + " | Quiz | "+ ViewData["baseTitle"];
                metaInfo.Description = AppService.StripHtml((string)quiz.Description);
                metaInfo.Keywords = AppService.GetKeywordsFromTags(quiz.Tags);
                metaInfo.Tags = AppService.GetMetaTagsFromTags(quiz.Tags);
                metaInfo.Type = "Quiz";
                metaInfo.AuthorName = quiz.Author.UserName;
                metaInfo.TwitterAuthorHandle = quiz.Author.Twitter;
                metaInfo.TwitterAuthorHandle = (string)ViewData["twitterSiteHandle"];
                metaInfo.PageImage = ViewData["baseApiUrl"] + "/" + ViewData["quizImageApiUrl"] + "/" + quiz.QuizId + "/" + quiz.Name;
                metaInfo.PageImageAlt = quiz.Title;
                metaInfo.PublishedDate = quiz.CreatedDate.ToString();
                metaInfo.UpdatedDate = quiz.UpdatedDate.ToString();
                metaInfo.CanonicalUrl = ViewData["baseWebUrl"] + "/" + canonicalEndPointUrl;

                AppService.SetMetaInfoView(metaInfo, ViewData);
                ViewData["currentQuiz"] = quiz;
            }
            else
            {
                ViewData["currentQuiz"] = null;
            }
        }

    }
}
