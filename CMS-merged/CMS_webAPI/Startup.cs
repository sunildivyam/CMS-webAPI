using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace CMS_webAPI
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }       

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            
            app.UseMvc(routes =>
            {                
                routes.MapRoute("Articles",
                    "articles/{param1}/{param2}/{param3}", 
                    defaults: new {
                        controller = "Articles",
                        action = "Index",
                        param1 = "",
                        param2 = "",
                        param3 = ""
                    });
                routes.MapRoute("Quizzes",
                    "quizzes/{param1}/{param2}/{param3}",
                    defaults: new
                    {
                        controller = "Quizzes",
                        action = "Index",
                        param1 = "",
                        param2 = "",
                        param3 = ""
                    });

                routes.MapRoute(
                    name: "Default",
                    template: "{controller=Home}/{action=Index}");
            });
        }
    }
}
