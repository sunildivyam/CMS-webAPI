
using System;
using System.Web.Mvc;

namespace CMS_webAPI.Controllers
{
    public class HomeController : Controller
    {        
        public ActionResult Index()
        {   try
            {
                AppService.PopulateAppConfig(ViewData, ViewBag);
                return View();
            } catch(Exception ex)
            {
                return View(ex);
            }
        }

        
        
        public ActionResult Error()
        {
            return View();
        }
    }
}
