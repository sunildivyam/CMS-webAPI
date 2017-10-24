using CMS_webAPI.AppCode;
using Microsoft.AspNetCore.Mvc;

namespace CMS_webAPI.Controllers
{
    public class QuizzesController : Controller
    {
        public IActionResult Index(string param1, string param2, string param3)
        {
            AppService.PopulateAppConfig(ViewData, ViewBag);
            string endPointUrl = "";
            string canonicalEndPointUrl = "";
            //Articles by Category
            if (param1 != null && param1.ToLower() == "quiz")
            {
                if (param2 != null && param3 != null)
                {
                    endPointUrl = "api/quizs/GetLiveQuizWithTagsAndQuestions/" + param2 + "/" + param3;
                    canonicalEndPointUrl = "quizzes/" + param1 + "/" + param2 + "/" + param3;
                    QuizzesService.SetMetaQuizPage(endPointUrl, canonicalEndPointUrl, ViewData);
                }
            }

            return View();
        }
    }
}