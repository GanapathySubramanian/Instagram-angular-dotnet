using System;
using System.Linq;
namespace Instagram.Data

{
    public class DbInitializer
    {
        public static void Initialize(PostsContext context)
        {
            context.Database.EnsureCreated();
            if (context.Posts.Any())
            {
                Console.WriteLine("Hello this is db initializer");
                return;
            }
            var posts = new WeatherForecast[]
            {
                new WeatherForecast{
                    link = "https://variety.com/wp-content/uploads/2022/05/Doctor-STrange-2.jpg?w=681&h=383&crop=1",
                    likeCount = 4,
                    commentCount=7,
                },
                new WeatherForecast
                {
                    link = "https://images.thedirect.com/media/article_full/wandavision-episode-8.jpg",
                    likeCount = 3,
                    commentCount=1,
                },
                new WeatherForecast
                {
                    link = "https://static.toiimg.com/photo/msid-88521380/88521380.jpg",
                    likeCount = 5,
                    commentCount=1,
                },
                new WeatherForecast
                {
                    link = "https://images.thedirect.com/media/article_full/Thumbnails_hAmyT3V.jpg",
                    likeCount = 9,
                    commentCount=10,
                },
                new WeatherForecast
                {
                    link = "https://staticg.sportskeeda.com/editor/2021/11/207ec-16358773930640-1920.jpg",
                    likeCount = 10,
                    commentCount=0,
                },

            };
            foreach (WeatherForecast s in posts)
            {
                context.Posts.Add(s);
            }
            context.SaveChanges();

            var user = new User[]
            {
                new User{username = "lalith",
                name = "lalith",
                email = "yvlk@gmail.com",
                password = "Yvlk@123",
                profile = "https://variety.com/wp-content/uploads/2022/05/Doctor-STrange-2.jpg?w=681&h=383&crop=1"},
                new User{username = "vaish_sk",
                name = "Vaish",
                email = "svaish2000@gmail.com",
                password = "Vaish@123",
                profile = "https://variety.com/wp-content/uploads/2022/05/Doctor-STrange-2.jpg?w=681&h=383&crop=1"},
            };
            foreach (User c in user)
            {
                context.User.Add(c);
            }
            context.SaveChanges();
        }
    }
}