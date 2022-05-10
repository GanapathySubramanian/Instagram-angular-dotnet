using Microsoft.EntityFrameworkCore;
using Instagram.Models;
namespace Instagram.Data
{
    public class PostsContext : DbContext
    {
        public PostsContext(DbContextOptions<PostsContext> options) : base(options)
        {
        }
        public DbSet<Post> Posts { get; set; }
        public DbSet<User> User { get; set; }

        public DbSet<Like> Like { get; set; }
        public DbSet<Comment> Comment { get; set; }
        protected override void OnModelCreating(ModelBuilder modelbuilder)
        {
            modelbuilder.Entity<User>().ToTable("Users");
            modelbuilder.Entity<Post>().ToTable("Posts");
            

            modelbuilder.Entity<Post>()
                .HasOne(u => u.user)
                .WithMany(p => p.post);
            
            modelbuilder.Entity<Like>().ToTable("Likes");
            modelbuilder.Entity<Comment>().ToTable("Comments");
        }
    }
}
