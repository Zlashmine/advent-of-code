use std::collections::HashMap;

use advent_of_code::remove_by_index;

advent_of_code::solution!(2);

pub fn part_one(input: &str) -> Option<u64> {
    let result = parse_input(input);
    let safe_rows = result.iter().filter(|row| is_row_safe(row));

    Some(safe_rows.count() as u64)
}

pub fn part_two(input: &str) -> Option<u64> {
    let mut rows: Vec<Vec<i32>> = parse_input(input)
        .iter()
        .filter(|row| !is_row_safe(row))
        .cloned()
        .collect();

    (0..rows.len()).for_each(|index| {
        let row = rows[index].clone();

        for i in 0..row.len() {
            let new_row = remove_by_index(&row, i);

            if is_row_safe(&new_row) {
                rows[index] = new_row;
                break;
            }
        }
    });

    let safe_rows_count = rows.iter().filter(|row| is_row_safe(row)).count();

    Some(safe_rows_count as u64)
}

fn is_row_safe(row: &[i32]) -> bool {
    let mut type_dict: HashMap<bool, i32> = std::collections::HashMap::new();

    let mut has_unsafe = false;

    for i in 0..row.len() {
        if i == row.len() - 1 {
            continue;
        }

        let value = row[i];
        let next = row[i + 1];

        let is_positive: bool = next - value >= 0;
        let current_count = type_dict.get(&is_positive).unwrap_or(&0);

        type_dict.insert(is_positive, current_count + 1);

        if !in_safe_change(next - value) {
            has_unsafe = true;
        }
    }

    !has_unsafe && type_dict.len() == 1
}

fn in_safe_change(value: i32) -> bool {
    value.abs() >= 1 && value.abs() <= 3
}

fn parse_input(input: &str) -> Vec<Vec<i32>> {
    input
        .lines() // split into rows
        .map(|line| {
            line.split_whitespace() // split row into number strings
                .map(|num| {
                    num.parse::<i32>() // parse each one as i32
                        .expect("invalid integer")
                })
                .collect::<Vec<i32>>() // collect each row into a Vec<i32>
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_part_one() {
        let result = part_one(&advent_of_code::template::read_file("inputs", DAY));
        assert_eq!(result, Some(332));
    }

    #[test]
    fn test_part_two() {
        let result = part_two(&advent_of_code::template::read_file("inputs", DAY));
        assert_eq!(result, Some(398));
    }
}
