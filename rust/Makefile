.PHONY: run build test lint migrate sqlx_prepare swagger

run:
	cargo run

run-cli:
	cargo run -- --cli data

run-release:
	./target/release/activity_api

run-cli-release:
	./target/release/activity_api --cli data

build:
	cargo build --release

test:
	cargo test

lint:
	cargo fmt
	cargo clippy
