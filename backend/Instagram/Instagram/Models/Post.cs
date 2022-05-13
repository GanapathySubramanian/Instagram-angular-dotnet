using System;

namespace Instagram
{
    public class Post
    {
        public int Id { get; set; }

        public string link { get; set; }

        public string caption { get; set; }

        public int likeCount { get; set; }

        public int commentCount { get; set; }
        
        public string location { get; set; }

        public int commentStatus { get; set; }

        public int likeCountStatus { get; set; }
        public DateTime timeStamp { get; set; }
        public User user { get; set; }
    }
}
