advent_of_code::solution!(1);

pub fn part_one(input: &str) -> Option<u64> {
    let (mut left_list, mut right_list) = parse_lists(input);

    left_list.sort();
    right_list.sort();

    let result = left_list
        .iter()
        .enumerate()
        .map(|(i, num)| (right_list[i] - num).abs())
        .sum::<i32>();

    Some(result as u64)
}

pub fn part_two(input: &str) -> Option<u64> {
    let (left_list, right_list) = parse_lists(input);

    let result = left_list
        .iter()
        .map(|num| right_list.iter().filter(|&&x| x == *num).count() as i32 * num)
        .sum::<i32>();

    Some(result as u64)
}

fn parse_lists(input: &str) -> (Vec<i32>, Vec<i32>) {
    let lists = input.split("\n").collect::<Vec<_>>();

    let mut left_list: Vec<i32> = Vec::new();
    let mut right_list: Vec<i32> = Vec::new();

    lists.iter().for_each(|line| {
        let (left, right) = line.split_once("   ").unwrap();

        left_list.push(left.parse::<i32>().unwrap());
        right_list.push(right.parse::<i32>().unwrap());
    });

    (left_list, right_list)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part_one() {
        let result = part_one(&advent_of_code::template::read_file("inputs", DAY));
        assert_eq!(result, Some(2196996));
    }

    #[test]
    fn test_part_two() {
        let result = part_two(&advent_of_code::template::read_file("inputs", DAY));
        assert_eq!(result, Some(23655822));
    }
}
