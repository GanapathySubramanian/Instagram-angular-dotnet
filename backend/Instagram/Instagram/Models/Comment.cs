namespace Instagram.Models
{
    public class Comment
    {
        public int commentId { get; set; }

        public int userId { get; set; }

        public string username { get; set; }

        public string profile { get; set; }

        public string text { get; set; }

        public int postId { get; set; }
    }
}
