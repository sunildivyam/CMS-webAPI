using CMS_webAPI.AppCode;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS_webAPI.Controllers
{

    public class ArticlesController : Controller
    {
        public ActionResult Index(string param1, string param2, string param3)
        {
            AppService.PopulateAppConfig(ViewData, ViewBag);
            string endPointUrl = "";
            string canonicalEndPointUrl = "";
            //Articles by Category
            if (param1 != null)
            {
                if (param2 != null && param3 != null)
                {
                    endPointUrl = "api/contents/GetContent/" + param1 + "/" + param2 + "/" + param3;
                    canonicalEndPointUrl = "articles/" + param1 + "/" + param2 + "/" + param3;
                    ArticlesService.SetMetaArticlePage(endPointUrl, canonicalEndPointUrl, ViewData);
                }
                else
                {
                    endPointUrl = "api/categories/GetCategoryByName/" + param1;
                    canonicalEndPointUrl = "articles/" + param1;
                    ArticlesService.SetMetaArticleByCategoryPage(endPointUrl, canonicalEndPointUrl, ViewData);                     
                }
            }

            return View();
        }
    }
}