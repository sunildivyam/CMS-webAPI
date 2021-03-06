﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using CMS_webAPI.Models;
using System.Data.SqlClient;
using CMS_webAPI.AppCode;

namespace CMS_webAPI.Controllers
{    
    public class ContentsController : ApiController
    {
        private CmsDbContext db = new CmsDbContext();

        public IHttpActionResult Get()
        {
            return BadRequest();
        }        

        // Gets all Published And Live Contents for a Category, contnetId and a contentName
        // GET: api/Contents/GetContent/category-name/5/content-name
        [ResponseType(typeof(ContentViewModel))]
        public async Task<IHttpActionResult> GetContent(string param1, int param2, string param3)
        {
            string cacheKey = ApiCache.GenerateKey("Contents", "GetContent", new string[] {param1, param2.ToString(), param3});
            ContentViewModel contentViewFromCache = (ContentViewModel)ApiCache.Get(cacheKey);

            if (contentViewFromCache != null)
            {
                db.Database.ExecuteSqlCommand("exec proc_UpdateVisitCountOnContents " + contentViewFromCache.ContentId);
                return Ok(contentViewFromCache);
            }

            var categoryName = param1;
            var contentId = param2;
            var contentName = param3;

            Content content = await db.Contents.FindAsync(contentId);
            if (content == null || !content.IsLive || content.Name != contentName || content.Category.Name != categoryName)
            {
                return NotFound();
            }

            ContentViewModel contentView = new ContentViewModel(content);
            db.Database.ExecuteSqlCommand("exec proc_UpdateVisitCountOnContents " + content.ContentId);
            // Update and increment the VisitCount By 1
                // Code goes here
            ApiCache.Add(cacheKey, contentView);
            return Ok(contentView);
        }

        // Gets all Published And Live Contents for a Category Name
        // GET: api/Contents/GetContentsByCategoryName/category-name
        [ResponseType(typeof(CategoryViewModel))]
        public async Task<IHttpActionResult> GetContentsByCategoryName(string param1,int param2, int param3, string param4, bool param5)
        {
            string cacheKey = ApiCache.GenerateKey("Contents", "GetContentsByCategoryName", new string[] {param1, param2.ToString(), param3.ToString(), param4, param5.ToString()});
            CategoryViewModel categoryViewFromCache = (CategoryViewModel)ApiCache.Get(cacheKey);

            if (categoryViewFromCache != null)
            {
                return Ok(categoryViewFromCache);
            }

            string categoryName = param1;
            int pageNo = param2;
            int pageSize = param3;
            string sortField = param4;
            bool sortDirAsc = param5;

            if (pageNo < 1 || pageSize < 1)
            {
                return BadRequest();
            }

            pageNo = pageNo - 1;
            Category category = await db.Categories.FirstOrDefaultAsync(c => c.Name == categoryName);

            if (category == null)
            {
                return NotFound();
            }
            List<Content> contents;
            IEnumerable<Content> contentsEnums;
            try
            {
                contentsEnums = db.Contents.Where(c => c.CategoryId == category.CategoryId && c.IsLive == true)
                    .AsEnumerable();
                contents = getPagedData(contentsEnums, pageNo, pageSize, sortField, sortDirAsc);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }          

            if (contents == null)
            {
                return NotFound();
            }

            CategoryViewModel categoryView = new CategoryViewModel(category, contents, contentsEnums.Count());

            ApiCache.Add(cacheKey, categoryView);
            return Ok(categoryView);
        }

        // Gets all Published And Live Contents for a Category Name
        // GET: api/Contents/GetSearchResults/category-name/search-keywords/pageno/pagesize/sortfield/sortdir
        [ResponseType(typeof(CategoryViewModel))]
        public async Task<IHttpActionResult> GetSearchResults(string param1, string param2, int param3, int param4, string param5, bool param6)
        {
            string categoryName = param1.ToLower();
            string searchWordsCriteria = param2;
            int pageNo = param3;
            int pageSize = param4;
            string sortField = "c." + param5;
            bool sortDirAsc = param6;
            string sortDir = "ASC";
            
            List<Content> contents = new List<Content>();
            Category category = new Category();
            int categoryId = 0;
            int totalCount = 0;

            if (categoryName != "all") {
                category = await db.Categories.FirstOrDefaultAsync(c => c.Name == categoryName);
                categoryId = category != null ? category.CategoryId : 0;
            }
            
            if (pageNo < 1 || pageSize < 1)
            {
                return BadRequest();
            }
            pageNo = pageNo - 1;
            searchWordsCriteria = searchWordsCriteria.Replace("-", " or ");
            
            //string SearchWordsCriteria = "Respiratory or digestive";
            string searchQuery = @"select distinct c.* from Contents as c 
                inner join ContentTags as ct on c.ContentId = ct.ContentId 
                inner join Tags as tg on ct.TagId=tg.TagId 
                WHERE c.IsLive='True' AND " + (categoryName != "all" ? "c.CategoryId = @CategoryId AND (" : "") +
                @"contains(c.Title, @SearchWordsCriteria) OR                
                contains (c.ShortDescription, @SearchWordsCriteria) OR
                contains (c.Description, @SearchWordsCriteria) OR
                contains (tg.Title, @SearchWordsCriteria)" + (categoryName != "all" ? ")" : "");

            string searchQueryForPagedData = searchQuery + " order by " + sortField + " " + sortDir + " OFFSET @PageStart ROWS FETCH NEXT @PageSize ROWS ONLY";
            string searchQueryForTotalCount = "Select Count(cc.ContentId) as TotalCount from (" + searchQuery + ") as cc";

            var ParamsPagedData = new [] 
            {
                new SqlParameter("SearchWordsCriteria", searchWordsCriteria),
                new SqlParameter("CategoryId", categoryId),
                new SqlParameter("SortField", sortField),
                new SqlParameter("SortDir", sortDir),
                new SqlParameter("PageStart", pageNo * pageSize),
                new SqlParameter("PageSize", pageSize)
            };

            var ParamsTotalCount = new[] 
            {
                new SqlParameter("SearchWordsCriteria", searchWordsCriteria),
                new SqlParameter("CategoryId", categoryId),
                new SqlParameter("SortField", sortField),
                new SqlParameter("SortDir", sortDir)
            };

            try
            {
                var TotalCountResult = db.Database.SqlQuery<int>(searchQueryForTotalCount, ParamsTotalCount).ToList();

                totalCount = TotalCountResult[0];
                if (totalCount > 0)
                {
                    contents = db.Database.SqlQuery<Content>(searchQueryForPagedData, ParamsPagedData)
                    .ToList<Content>();
                }                
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }              

            if (contents == null)
            {
                return NotFound();
            }

            CategoryViewModel categoryView = new CategoryViewModel(category, contents, totalCount);

            return Ok(categoryView);
        }


        // Gets all Published And Live Contents having a tag
        // GET: api/Contents/GetContentsByTag/tag-id/tag-name/search-keywords/pageno/pagesize/sortfield/sortdir
        [ResponseType(typeof(TagViewModel))]
        public async Task<IHttpActionResult> GetContentsByTag(int param1, string param2, int param3, int param4, string param5, bool param6)
        {
            int tagId = param1;
            string tagName = param2;
            int pageNo = param3;
            int pageSize = param4;
            string sortField = "c." + param5;
            bool sortDirAsc = param6;
            string sortDir = "ASC";

            List<Content> contents = new List<Content>();
            Tag tag = await db.Tags.FirstOrDefaultAsync(t=> t.TagId == tagId && t.Name == tagName);           
            int totalCount = 0;

            
            if (pageNo < 1 || pageSize < 1)
            {
                return BadRequest();
            }
            pageNo = pageNo - 1;
           
            string searchQuery = @"select distinct c.* from Contents as c 
                inner join ContentTags as ct on c.ContentId = ct.ContentId                  
                WHERE ct.TagId= @TagId AND c.IsLive='True'";

            string searchQueryForPagedData = searchQuery + " order by " + sortField + " " + sortDir + " OFFSET @PageStart ROWS FETCH NEXT @PageSize ROWS ONLY";
            string searchQueryForTotalCount = "Select Count(cc.ContentId) as TotalCount from (" + searchQuery + ") as cc";

            var ParamsPagedData = new[] 
            {
                new SqlParameter("TagId", tagId),                
                new SqlParameter("SortField", sortField),
                new SqlParameter("SortDir", sortDir),
                new SqlParameter("PageStart", pageNo * pageSize),
                new SqlParameter("PageSize", pageSize)
            };

            var ParamsTotalCount = new[] 
            {
                new SqlParameter("TagId", tagId),                
                new SqlParameter("SortField", sortField),
                new SqlParameter("SortDir", sortDir)
            };

            try
            {
                var TotalCountResult = db.Database.SqlQuery<int>(searchQueryForTotalCount, ParamsTotalCount).ToList();

                totalCount = TotalCountResult[0];
                if (totalCount > 0)
                {
                    contents = db.Database.SqlQuery<Content>(searchQueryForPagedData, ParamsPagedData)
                    .ToList<Content>();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            if (contents == null)
            {
                return NotFound();
            }

            TagViewModel tagView = new TagViewModel(tag, contents, totalCount);

            return Ok(tagView);
        }

        // Gets all Published And Live Contents of a User (Author)
        // GET: api/Contents/GetContentsByUserName/username/pageno/pagesize/sortfield/sortdir
        [ResponseType(typeof(AuthorViewModel))]
        public async Task<IHttpActionResult> GetContentsByUserName(string param1, int param2, int param3, string param4, bool param5)
        {            
            string userName = param1;
            int pageNo = param2;
            int pageSize = param3;
            string sortField = "c." + param4;
            bool sortDirAsc = param5;
            string sortDir = "ASC";

            List<Content> contents = new List<Content>();            
            int totalCount = 0;

            ApplicationUser user = UserService.getUserByUserName(userName);
            
            if (user == null)
            {
                return NotFound();
            }

            UserInfoViewModel author = UserService.AppUserToUserInfoViewModel(user);            

            if (pageNo < 1 || pageSize < 1)
            {
                return BadRequest();
            }
            pageNo = pageNo - 1;

            string searchQuery = @"select c.* from Contents as c                
                WHERE c.OwnerId=@UserId AND c.IsLive='True'";

            string searchQueryForPagedData = searchQuery + " order by " + sortField + " " + sortDir + " OFFSET @PageStart ROWS FETCH NEXT @PageSize ROWS ONLY";
            string searchQueryForTotalCount = "Select Count(cc.ContentId) as TotalCount from (" + searchQuery + ") as cc";

            var ParamsPagedData = new[] 
            {
                new SqlParameter("UserId", user.Id),                
                new SqlParameter("SortField", sortField),
                new SqlParameter("SortDir", sortDir),
                new SqlParameter("PageStart", pageNo * pageSize),
                new SqlParameter("PageSize", pageSize)
            };

            var ParamsTotalCount = new[] 
            {
                new SqlParameter("UserId", user.Id),                
                new SqlParameter("SortField", sortField),
                new SqlParameter("SortDir", sortDir)
            };

            try
            {
                var TotalCountResult = db.Database.SqlQuery<int>(searchQueryForTotalCount, ParamsTotalCount).ToList();

                totalCount = TotalCountResult[0];
                if (totalCount > 0)
                {
                    contents = db.Database.SqlQuery<Content>(searchQueryForPagedData, ParamsPagedData)
                    .ToList<Content>();
                }
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }

            if (contents == null)
            {
                return NotFound();
            }

            AuthorViewModel authorView = new AuthorViewModel(author, contents, totalCount);
            await Task.Delay(0);
            return Ok(authorView);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ContentExists(int id)
        {
            return db.Contents.Count(e => e.ContentId == id) > 0;
        }

        private List<Content> getPagedData(IEnumerable<Content> contentsEnums, int pageNo, int pageSize, string sortField, bool sortDirAsc)
        {
            List<Content> contents = new List<Content>();
            if (contentsEnums == null)
            {
                return contents;
            }

            int skipSize = ((pageNo) * pageSize);

            if (sortDirAsc == true)
            {
                contents = contentsEnums.OrderBy(c => c.GetType().GetProperty(sortField).GetValue(c, null))
                .Skip(skipSize)
                .Take(pageSize)
                .ToList();
            }
            else
            {
                contents = contentsEnums.OrderByDescending(c => c.GetType().GetProperty(sortField).GetValue(c, null))
                .Skip(skipSize)
                .Take(pageSize)
                .ToList();
            }
            return contents;
        }
    }
}