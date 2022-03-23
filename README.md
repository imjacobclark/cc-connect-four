# cc-connect-four
AND Digital - Connect Four coding challenge

## Setup Engine:

```shell
brew install deno
```

## Run tests

```shell
cd api
deno test EngineTest.ts
```

## Run engine against sample input

```shell
cd api
deno run SameplSetOfMoves.ts
```

## Run Engine API

```shell
cd api
deno run --alow-net app.js 
```

## Setup Frontend:

```shell
cd app
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32-unknown-unknown
cargo install --locked trunk
```

## Serve Frontend:

```shell
trunk serve
```