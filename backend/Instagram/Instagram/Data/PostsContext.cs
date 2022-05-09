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
            modelbuilder.Entity<User>().ToTable("Users");
            modelbuilder.Entity<Post>().ToTable("Posts");
    
            modelbuilder.Entity<Post>()
                .HasOne(u => u.user)
                .WithMany(p => p.post);
        }
    }
}
