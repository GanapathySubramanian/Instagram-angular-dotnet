using Microsoft.EntityFrameworkCore;
namespace Instagram.Data
{
    public class PostsContext : DbContext
    {
        public PostsContext(DbContextOptions<PostsContext> options) : base(options)
        {
        }
        public DbSet<WeatherForecast> Posts { get; set; }
        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            modelbuilder.Entity<WeatherForecast>().ToTable("Posts");
        }
    }
}
