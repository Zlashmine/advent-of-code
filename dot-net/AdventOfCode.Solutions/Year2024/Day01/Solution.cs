namespace AdventOfCode.Solutions.Year2024.Day01;

public class Solution() : SolutionBase(1, 2024, "Historian Hysteria", new []{"2196996", "23655822"})
{
    protected override string SolvePartOne()
    {
        (int[] left, int[] right) = Parse(Input.SplitByNewline());
        
        Array.Sort(left);
        Array.Sort(right);

        return left
            .Select((t, i) => Math.Abs(t - right[i]))
            .Sum()
            .ToString();
    }

    protected override string SolvePartTwo()
    {
        (int[] left, int[] right) = Parse(Input.SplitByNewline());
        
        return left
            .Select((t) => right.Count(c => c == t) * t)
            .Sum()
            .ToString();
    }

    private (int[] left, int[] right) Parse(string[] rows)
    {
        int[] left = new int[rows.Length];
        int[] right = new int[rows.Length];

        for (int index = 0; index < rows.Length; index++)
        {
            string row = rows[index];
            string[] groups = row.Split("   ");

            left[index] = int.Parse(groups[0]);
            right[index] = int.Parse(groups[1]);
        }

        return (left, right);
    }
}