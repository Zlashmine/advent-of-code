# 🎄 Advent of Code {year}

<!--- advent_readme_stars table --->

<!--- benchmarking table --->
## Benchmarks

| Day | Part 1 | Part 2 |
| :---: | :---: | :---:  |
| [Day 1](./src/bin/01.rs) | `51.0µs` | `78.4µs` |
| [Day 2](./src/bin/02.rs) | `264.8µs` | `1.2ms` |
| [Day 3](./src/bin/03.rs) | `210.6µs` | `316.7µs` |

**Total: 2.12ms**
<!--- benchmarking table --->
## Usage
### ➡️ Scaffold a day

```sh
# example: `cargo scaffold 1`
cargo scaffold 1 --download
cargo download 1

cargo solve 1
# Benchmark
cargo all

cargo time 1 --store
cargo time --all --store
cargo test

#Format
cargo fmt

#Lint
cargo clippy
```
