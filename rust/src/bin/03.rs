use regex::Regex;

advent_of_code::solution!(3);

struct Instruction {
    instruction_type: String,
    index: usize,
    number: i64,
}

pub fn part_one(input: &str) -> Option<u64> {
    let re = Regex::new(r"mul\((\d+),(\d+)\)").unwrap();

    let result: i64 = re
        .captures_iter(input)
        .map(|caps| {
            let b: i64 = caps[1].parse().expect("invalid integer");
            let c: i64 = caps[2].parse().expect("invalid integer");
            b * c
        })
        .sum();

    Some(result as u64)
}

pub fn part_two(input: &str) -> Option<u64> {
    let mul_regexp = Regex::new(r"mul\((\d+),(\d+)\)").unwrap();
    let do_regexp = Regex::new(r"do\(\)").unwrap();
    let dont_regexp = Regex::new(r"\bdon't\(\)").unwrap();

    let mut instructions: Vec<Instruction> = vec![];

    for m in mul_regexp.find_iter(input) {
        let caps = mul_regexp.captures(m.as_str()).unwrap();

        let number: i64 = caps[1].parse().expect("invalid integer");
        let number_2: i64 = caps[2].parse().expect("invalid integer");

        instructions.push(Instruction {
            instruction_type: "multiply".to_string(),
            index: m.start(),
            number: number * number_2,
        });
    }

    for m in dont_regexp.find_iter(input) {
        instructions.push(Instruction {
            instruction_type: "disable".to_string(),
            index: m.start(),
            number: 0,
        });
    }

    for m in do_regexp.find_iter(input) {
        instructions.push(Instruction {
            instruction_type: "enable".to_string(),
            index: m.start(),
            number: 0,
        });
    }

    instructions.sort_by(|a, b| a.index.cmp(&b.index));

    let current_type: String = instructions[0].instruction_type.clone();

    let mut enabled = current_type != "disable";
    let mut result: u64 = 0;

    for instruction in instructions {
        match instruction.instruction_type.as_str() {
            "multiply" => {
                if enabled {
                    result += instruction.number as u64;
                }
            }
            "disable" => {
                enabled = false;
            }
            "enable" => {
                enabled = true;
            }
            _ => {}
        }
    }

    Some(result)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part_one() {
        let result = part_one(&advent_of_code::template::read_file("inputs", DAY));
        assert_eq!(result, Some(181345830));
    }

    #[test]
    fn test_part_two() {
        let result: Option<u64> = part_two(&advent_of_code::template::read_file("inputs", DAY));
        assert_eq!(result, Some(98729041));
    }
}
