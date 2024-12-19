global using System;
global using System.Collections.Generic;
global using System.Linq;
global using AdventOfCode.Solutions.Utils;

using System.Diagnostics;
using System.Net;

namespace AdventOfCode.Solutions;

public abstract class SolutionBase
{
    private int Day { get; }
    private int Year { get; }
    private string Title { get; }
    public string[] Expected { get; }
    private bool Debug { get; set; }
    public string Input => LoadInput();
    private string DebugInput => LoadInput();
    
    public bool IsTest { get; set; }

    private SolutionResult Part1 => Solve(1);
    private SolutionResult Part2 => Solve(2);

    private protected SolutionBase(int day, int year, string title, string[] expected)
    {
        Day = day;
        Year = year;
        Title = title;
        Expected = expected;
    }

    public IEnumerable<SolutionResult> SolveAll()
    {
        yield return Solve(SolvePartOne);
        yield return Solve(SolvePartTwo);
    }

    public SolutionResult Solve(int part)
    {
        if (part == 1) return Solve(SolvePartOne);
        if (part == 2) return Solve(SolvePartTwo);

        throw new InvalidOperationException("Invalid part param supplied.");
    }

    private SolutionResult Solve(Func<string> SolverFunction)
    {
        if (Debug)
        {
            if (string.IsNullOrEmpty(DebugInput))
            {
                throw new Exception("DebugInput is null or empty");
            }
        }
        else if (string.IsNullOrEmpty(Input))
        {
            throw new Exception("Input is null or empty");
        }

        try
        {
            DateTime then = DateTime.Now;
            string result = SolverFunction();
            DateTime now = DateTime.Now;
            
            return string.IsNullOrEmpty(result)
                ? SolutionResult.Empty
                : new SolutionResult { Answer = result, Time = now - then };
        }
        catch (Exception)
        {
            if (Debugger.IsAttached)
            {
                Debugger.Break();
                return SolutionResult.Empty;
            }

            throw;
        }
    }

    private string LoadInput(string inputFilepath)
    {
        if (File.Exists(inputFilepath) && new FileInfo(inputFilepath).Length > 0)
        {
            return File.ReadAllText(inputFilepath);
        }

        try
        {
            string input = AdventOfCodeClient.FetchInput(Year, Day).Result;
            File.WriteAllText(inputFilepath, input);
            
            return input;
        }
        catch (HttpRequestException e)
        {
            switch (e.StatusCode)
            {
                case HttpStatusCode.BadRequest:
                    Console.WriteLine($"Day {Day}: Received 400 when attempting to retrieve puzzle input. Your session cookie is probably not recognized.");
                    break;
                case HttpStatusCode.NotFound:
                    Console.WriteLine($"Day {Day}: Received 404 when attempting to retrieve puzzle input. The puzzle is probably not available yet.");
                    break;
                default:
                    Console.WriteLine(e.ToString());
                    break;
            }
        }

        return "";
    }

    private string LoadInput()
    {
        return LoadInput(IsTest ? "input.txt" : $"./AdventOfCode.Solutions/Year{Year}/Day{Day:D2}/input");
    }

    public override string ToString() =>
        $"\n--- Day {Day}: {Title} --- {(Debug ? "!! Debug mode active, using DebugInput !!" : "")}\n"
        + $"{ResultToString(1, Part1)}\n"
        + $"{ResultToString(2, Part2)}";

    private string ResultToString(int part, SolutionResult result)
    {
        string expected = Expected[part-1] == result.Answer ? "" : $"(Expected: {Expected})";
        
        return $"  - Part{part} => " + (string.IsNullOrEmpty(result.Answer)
            ? "Unsolved"
            : $"{result.Answer} {expected} ({result.Time.TotalMilliseconds}ms)");
    }

    protected abstract string SolvePartOne();
    protected abstract string SolvePartTwo();
}
