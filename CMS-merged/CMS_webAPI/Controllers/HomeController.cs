using System;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using System.Dynamic;

namespace CMS_webAPI.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {   try
            {
                string configJsonStr = System.IO.File.ReadAllText(Path.GetFullPath("wwwroot/data/list-config.json"));
                dynamic configJsonObj = new ExpandoObject();
                configJsonObj = JsonConvert.DeserializeObject(configJsonStr);

                string categories = "[]";
                string apiUrl = configJsonObj.application.apiUrl;

                // Get all categories
                HttpClient dataClient = new HttpClient();
                dataClient.BaseAddress = new Uri(apiUrl);
                dataClient.DefaultRequestHeaders.Accept.Clear();
                dataClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                dataClient.DefaultRequestHeaders.UserAgent.ParseAdd("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36");
                HttpResponseMessage response = dataClient.GetAsync("api/categories/getCategories").Result;
                if (response.IsSuccessStatusCode)
                {
                    categories = response.Content.ReadAsStringAsync().Result;
                }

                configJsonObj.categories = JsonConvert.DeserializeObject(categories);

                ViewData["appConfig"] = configJsonObj;

                return View();
            } catch(Exception ex)
            {
                return View(ex);
            }
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";
            
            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
