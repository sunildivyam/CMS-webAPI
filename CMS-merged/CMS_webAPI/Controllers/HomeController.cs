using Microsoft.AspNetCore.Mvc;
using System;

namespace CMS_webAPI.Controllers
{
    public class HomeController : Controller
    {        
        public IActionResult Index()
        {   try
            {
                AppService.PopulateAppConfig(ViewData, ViewBag);
                return View();
            } catch(Exception ex)
            {
                return View(ex);
            }
        }

        
        
        public IActionResult Error()
        {
            return View();
        }
    }
}
