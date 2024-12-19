using NUnit.Framework;

namespace AdventOfCode.Solutions.Year2024.Day03;

[TestFixture]
public class SolutionTests
{
    [TestCase("181345830", "98729041")]
    public static Task Test(string sol1, string sol2)
    {
        Solution instance = new();
        instance.IsTest = true;
        
        Assert.That(() => instance.Solve(1).Answer, Is.EqualTo(sol1));
        Assert.That(() => instance.Solve(2).Answer, Is.EqualTo(sol2));
        
        return Task.CompletedTask;
    }
}