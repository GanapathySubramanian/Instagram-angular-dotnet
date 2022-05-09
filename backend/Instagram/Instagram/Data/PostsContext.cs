using Microsoft.EntityFrameworkCore;
namespace Instagram.Data
{
    public class PostsContext : DbContext
    {
        public PostsContext(DbContextOptions<PostsContext> options) : base(options)
        {
        }
        public DbSet<Post> Posts { get; set; }
        public DbSet<User> User { get; set; }
        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            modelbuilder.Entity<Post>().ToTable("Posts");
            modelbuilder.Entity<User>().ToTable("Users");
        }
    }
}
