using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CMS_webAPI.Controllers
{
    public class ValuesController : ApiController
    {
        private string[] data = new string[] { "value1", "value2" };

        // GET api/values
        
        public string[] Get()
        {
            return data;
        }
        
        [Authorize]
        // GET api/values/5
        public string Get(int id)
        {
            return data[id];
        }

        // POST api/values
        public string[] Post([FromBody]string[] value)
        {
            data = value;
            return data;
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
            data[id] = value;
        }

        // DELETE api/values/5
        public string Delete(int id)
        {
            return data[id];
        }
    }
}