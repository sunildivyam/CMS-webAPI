using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Caching;
using System.IO;

namespace CMS_webAPI.AppCode
{
    
    public static class ApiCache
    {
        private static int CACHE_EXPIRY_DAYS = 7;

        public static Object Get(string key) {
            MemoryCache memCache = MemoryCache.Default;
            return memCache.Get(key);
        }

        public static void Add(string key, Object value)
        {
            MemoryCache memCache = MemoryCache.Default;
            memCache.Set(key, value, DateTimeOffset.UtcNow.AddDays(CACHE_EXPIRY_DAYS));
        }

        public static void Remove(string key)
        {
            MemoryCache memCache = MemoryCache.Default;
            if (memCache.Contains(key))
            {
                memCache.Remove(key);
            }
        }

        public static void Remove(string key, Boolean IsContainsMatch)
        {
            if (IsContainsMatch == false)
            {
                Remove(key);
            }
            else
            {
                MemoryCache memCache = MemoryCache.Default;
                IEnumerable<KeyValuePair<string, object>> matchedCacheItems = memCache.Where(c=> c.Key.Contains(key) == true);
                foreach (var item in matchedCacheItems)
                {
                    memCache.Remove(item.Key);
                }
            }            
        }

        public static void RemoveAll()
        {
            MemoryCache memCache = MemoryCache.Default;
            var allCacheItems = memCache.ToList();
            foreach (var item in allCacheItems)
            {
                memCache.Remove(item.Key);
            }
        }


        public static IList<string> GetAllKeys()
        {
            MemoryCache memCache = MemoryCache.Default;
            IList<string> allKeys = new List<string>();

            var allCacheItems = memCache.ToList();
            foreach (var item in allCacheItems)
            {
                allKeys.Add(item.Key);
            }
            return allKeys;
        }

        public static string GenerateKey(string ctrlName, string methodName, string[] parameters)
        {
            string[] paramArray = { "api", ctrlName, methodName };
            if (parameters != null)
            {
                paramArray = paramArray.Concat(parameters).ToArray<string>();
            }
            
            return Path.Combine(paramArray).Replace('\\', '/');            
        }        
    }

    public class ApiCacheViewModel
    {
        public string Key { get; set; }
    }
}