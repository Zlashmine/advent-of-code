using System.Net;

namespace AdventOfCode.Solutions;

public static class AdventOfCodeClient
{
    private static readonly HttpClientHandler _handler = new()
    {
        CookieContainer = GetCookieContainer(),
        UseCookies = true,
    };

    private static readonly HttpClient _client = new(_handler)
    {
        BaseAddress = new Uri("https://adventofcode.com/"),
    };

    public static async Task<string> FetchInput(int year, int day)
    {
        HttpResponseMessage response = await _client.GetAsync($"{year}/day/{day}/input");
        return await response.EnsureSuccessStatusCode().Content.ReadAsStringAsync();
    }

    private static CookieContainer GetCookieContainer()
    {
        CookieContainer container = new CookieContainer();
        container.Add(new Cookie
        {
            Name = "session",
            Domain = ".adventofcode.com",
            Value = Config.Get().Cookie.Replace("session=", ""),
        });

        return container;
    }
}
