using CMS_webAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Hosting;
using System.Dynamic;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Web.Http.Description;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Threading.Tasks;
using CMS_webAPI.AppCode;
using System.IO;

namespace CMS_webAPI.Controllers
{
    public class CfgController : ApiController
    {
        public AppConfigModel Post([FromBody]AppConfigModel appConfig)
        {
            String AuthorizationHeader = this.Request.Headers.Authorization.ToString();
            if (AuthorizationHeader != null)
            {
                String AuthorizationHeaderScheme = "Bearer";
                String ValidRole = "Administrators";
                String AuthorizationHeaderParameter = AuthorizationHeader.Substring(AuthorizationHeaderScheme.Length + 1);

                // Get Authorization
                try
                {

                    string configJsonStr = System.IO.File.ReadAllText(HostingEnvironment.MapPath("~/wwwroot/data/list-config.json"));
                    dynamic configJsonObj = new ExpandoObject();
                    configJsonObj = JsonConvert.DeserializeObject(configJsonStr);

                    string userInfo = "{}";
                    string apiUrl = configJsonObj.application.apiUrl;

                    HttpClient dataClient = new HttpClient();
                    dataClient.BaseAddress = new Uri(apiUrl);
                    dataClient.DefaultRequestHeaders.Accept.Clear();
                    dataClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    dataClient.DefaultRequestHeaders.UserAgent.ParseAdd("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36");
                    dataClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(AuthorizationHeaderScheme, AuthorizationHeaderParameter);
                    HttpResponseMessage response = dataClient.GetAsync("api/account/UserInfo").Result;
                    if (response.IsSuccessStatusCode)
                    {
                        userInfo = response.Content.ReadAsStringAsync().Result;
                        configJsonObj.userInfo = JsonConvert.DeserializeObject(userInfo);

                        if (IsUserAdministrator(configJsonObj.userInfo.Roles, ValidRole) == true)
                        {
                            if (SaveConfigJSON(appConfig) == true)
                            {                                
                                //return Json(appConfig);
                                //return Newtonsoft.Json.JsonConvert.SerializeObject(appConfig);
                                return appConfig;
                            }
                            else
                            {
                                return null;
                            }
                        }
                        else
                        {
                            return null;
                        }
                    }
                    else
                    {
                        return null;
                    }
                }
                catch (Exception ex)
                {
                    return null;
                }
            }

            return null;
        }

        private Boolean SaveConfigJSON(AppConfigModel appConfig)
        {
            try
            {
                string sourceFileFullPath = HostingEnvironment.MapPath("~/wwwroot/data/list-config.json");
                string backupFileFullPath = Path.Combine(
                    HostingEnvironment.MapPath("~/wwwroot/data/"),
                    Path.GetFileNameWithoutExtension(sourceFileFullPath) + "-" + DateTime.Now.Ticks + ".json");

                System.IO.File.Copy(sourceFileFullPath, backupFileFullPath);
                System.IO.File.WriteAllText(sourceFileFullPath, appConfig.AppConfigJsonString);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        private Boolean IsUserAdministrator(dynamic CurrentUserRoles, string AdminUserRole)
        {
            if (CurrentUserRoles.Count > 0)
            {
                foreach (string role in CurrentUserRoles)
                {
                    if (role == AdminUserRole)
                    {
                        return true;
                    }
                }
                return false;

            }
            else
            {
                return false;
            }
        }
    }
}
