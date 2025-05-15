advent_of_code::solution!(1);

pub fn part_one(_input: &str) -> Option<u64> {
    Some(32)
}

pub fn part_two(_input: &str) -> Option<u64> {
    Some(32)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part_one() {
        let result = part_one(&advent_of_code::template::read_file("examples", DAY));
        assert_eq!(result, Some(32));
    }

    #[test]
    fn test_part_two() {
        let result = part_two(&advent_of_code::template::read_file("examples", DAY));
        assert_eq!(result, Some(32));
    }
}
