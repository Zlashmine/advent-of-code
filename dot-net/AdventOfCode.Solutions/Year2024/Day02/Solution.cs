namespace AdventOfCode.Solutions.Year2024.Day02;

internal class Solution() : SolutionBase(2, 2024, "Red-Nosed Reports", new []{"332", "398"})
{
    protected override string SolvePartOne()
    {
        int[][] rows = GetRows();
        
        return rows.Count(IsRowSafe).ToString();
    }

    protected override string SolvePartTwo()
    {
        int[][] rows = GetRows();
        int total = 0;
        
        foreach (int[] row in rows)
        {
            if (IsRowSafe(row))
            {
                total++;
                continue;
            }
            
            for (int j = 0; j < row.Length; j++)
            {
                if (!IsRowSafe(row.RemoveAt(j))) {
                    continue;
                }

                total++;
                break;
            }
        }
        
        return total.ToString();
    }
    
    private static bool IsRowSafe(int[] row) 
    {
        IDictionary<int, int> directionsDictionary = new Dictionary<int, int>();

        for (int i = 0; i < row.Length; i++)
        {
            if (i >= row.Length - 1)
            {
                break;
            }

            int next = row[i + 1];
            int diff = Math.Abs(next - row[i]);
            int key = next - row[i] > 0 ? 1 : 0;
            
            directionsDictionary.TryGetValue(key, out int value);
            directionsDictionary.TryAdd(key,  value + 1);
            
            if (!CalculationUtils.IsBetween(diff , 1, 3))
            {
                return false;
            }
        }
        
        return directionsDictionary.Keys.Count == 1;
    }
    
    private int[][] GetRows () 
    {
        int[][] rows = Input
            .SplitByNewline()
            .Select(row => row.Split(" ").Select(int.Parse).ToArray())
            .ToArray();
        
        return rows;
    }
}