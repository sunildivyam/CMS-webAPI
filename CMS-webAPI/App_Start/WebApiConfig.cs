using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using System.Web.Http.Cors;

namespace CMS_webAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
           
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));            
            
            // Web API routes
            config.MapHttpAttributeRoutes();
            
            // All Routes Author and pub
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{param1}/{param2}/{param3}/{param4}/{param5}/{param6}",
                defaults: new { 
                    param1 = RouteParameter.Optional, 
                    param2 = RouteParameter.Optional, 
                    param3 = RouteParameter.Optional,
                    param4 = RouteParameter.Optional,
                    param5 = RouteParameter.Optional,
                    param6 = RouteParameter.Optional,
                    action = "Get"
                }
            );     
       
            // JSON Serialize Settings
            //config.Formatters.JsonFormatter.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.Objects;
            config.Formatters.JsonFormatter.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore; 
        }
    }
}
