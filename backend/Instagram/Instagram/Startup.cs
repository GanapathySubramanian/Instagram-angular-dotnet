using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Instagram.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace Instagram
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
//string dir = @"./Resources/PostFiles";
//  If directory does not exist, create it
// if (!Directory.Exists(dir))
// {
//     Directory.CreateDirectory(dir);
// }

            var server = "insta-db.ca8hagjkzl9h.us-east-1.rds.amazonaws.com";
            var port = "1443";
            var user = "admin";
            var password = "admin12345";
            var database = "Instagram";
            services.AddDbContext<PostsContext>(options =>
               options.UseSqlServer($"Data Source=insta-db.ca8hagjkzl9h.us-east-1.rds.amazonaws.com; Initial Catalog=Instagram; User Id=admin;Password=admin12345"));
         
            // services.AddDbContext<PostsContext>(options =>
            //     options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

services.AddControllers(); 
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder
                            .AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod();
                    });
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }


            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();
            
            app.UseAuthorization();

          

            // app.UseStaticFiles();

            // app.UseStaticFiles(new StaticFileOptions()
            // {
            //     FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
            //     RequestPath = new PathString("/Instagram/Resources")
            // });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

        }
    }
}
