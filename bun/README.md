# Advent of Code with Bun

```bash
bun install
```

```bash
bun solve 1 # day to run
bun solve 1 --test # run with example input
```

```bash
bun test --watch
```

Build Executables

```bash
# Javascript
bun build ./app/runners/build-runner.ts ./src/06/input.txt --outdir ./build && bun ./build/app/runners/build-runner.js

# MAC OS
bun build --compile --target=bun-darwin-arm64 ./app/runners/build-runner.ts ./src/06/input.txt --outfile bun-advent-of-code
```

## Structure

```bash
📂 01
├── 📜 01.ts
├── 📜 01.test.ts
├── 📜 types.ts
├── 📜 example.txt
└── 📜 input.txt
```
