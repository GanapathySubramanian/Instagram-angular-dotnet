using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Instagram.Controllers
{
    [ApiController]
    [Route("api/posts")]
    //[EnableCors("AllowAllHeaders")]
    public class WeatherForecastController : ControllerBase
    {

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            //Response.Headers.Add("Access-Control-Allow-Origin", "*");
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                postId = index,
                link = "https://variety.com/wp-content/uploads/2022/05/Doctor-STrange-2.jpg?w=681&h=383&crop=1",
                likeCount = 1,
                commentCount=0
            })
            .ToArray();
        }
    }
}
