


using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using CMS_webAPI.AppCode;
using System.Web.Http.Description;
using CMS_webAPI.Models;


namespace CMS_webAPI.Controllers
{
    public class CacheController : ApiController
    {
        public IHttpActionResult Get()
        {
            return BadRequest();
        }

        [ResponseType (typeof(IList<string>))]
        public async Task<IHttpActionResult> GetKeys()
        {
            await Task.Delay(0);
            return  Ok(ApiCache.GetAllKeys());            
        }

        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PostClearCache(string key)
        {
            try { 
                ApiCache.Remove(key);
                await Task.Delay(0);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }           
            return Ok();
        }

        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PostClearCacheAll()
        {
            try
            {
                ApiCache.RemoveAll();
                await Task.Delay(0);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            return Ok();
        }
    }
}
