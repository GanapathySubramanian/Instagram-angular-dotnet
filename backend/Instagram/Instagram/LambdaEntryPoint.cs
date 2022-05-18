using Amazon.Lambda.AspNetCoreServer;
using Instagram;
using Microsoft.AspNetCore.Hosting;

namespace Instagram
{
    public class LambdaEntryPoint : APIGatewayHttpApiV2ProxyFunction
    {
        protected override void Init(IWebHostBuilder builder)
        {
            builder.UseStartup<Startup>();
        }
    }
}