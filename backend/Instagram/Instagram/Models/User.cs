using Instagram;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

public class User
{
	public User()
	{
	}

	public int id { get; set; }

	public string username { get; set; }

	public string email { get; set; }

	public string name { get; set; }


	public string profile { get; set; }

	public string password { get; set; }

	[JsonIgnore] 
	[IgnoreDataMember] 
	public ICollection<Post> post { get; set; }
}
