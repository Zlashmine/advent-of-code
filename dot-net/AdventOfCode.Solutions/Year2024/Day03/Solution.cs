using System.Text.RegularExpressions;

namespace AdventOfCode.Solutions.Year2024.Day03;


internal class Solution() : SolutionBase(3, 2024, "Mull It Over", new []{"181345830", "98729041"})
{
    private Regex mul = new(@"mul\((\d+),(\d+)\)");
    private Regex dos = new Regex(@"do\(\)");
    private Regex donts = new Regex(@"don't\(\)");
    
    enum InstructionType
    {
        Multiply,
        Disabled,
        Enabled
    }

    struct Instruction
    {
        public InstructionType Type;
        public int Index;
        public int Number;
    }

    protected override string SolvePartOne()
    {
        int total = 0;
        foreach (Match match in mul.Matches(Input))
        {
            int firstNumber = int.Parse(match.Groups[1].Value);
            int secondNumber = int.Parse(match.Groups[2].Value);

            total += firstNumber * secondNumber;
        }

        return total.ToString();
    }

    protected override string SolvePartTwo()
    {
        List<Instruction> instructions = new();

        foreach (Match match in mul.Matches(Input))
        {
            int firstNumber = int.Parse(match.Groups[1].Value);
            int secondNumber = int.Parse(match.Groups[2].Value);
            
            instructions.Add(new Instruction
            {
                Type = InstructionType.Multiply,
                Index = match.Index,
                Number = firstNumber * secondNumber,
            });
        }

        foreach (Match match in donts.Matches(Input))
        {
            instructions.Add(new Instruction
            {
                Type = InstructionType.Disabled,
                Index = match.Index
            });
        }

        foreach (Match match in dos.Matches(Input))
        {
            instructions.Add(new Instruction
            {
                Type = InstructionType.Enabled,
                Index = match.Index
            });
        }
        
        instructions.Sort((a, b) => a.Index - b.Index);

        int total = 0;
        
        InstructionType currentInstructionType = instructions[0].Type;
        foreach (Instruction instruction in instructions)
        {
            if (instruction.Type != InstructionType.Multiply)
            {
                currentInstructionType = instruction.Type;
                continue;
            }
            
            if (currentInstructionType == InstructionType.Disabled)
            {
                continue;
            }
                
            total += instruction.Number;
        }
        
        return total.ToString();
    }
}