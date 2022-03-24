import { assertEquals } from "https://deno.land/std@0.130.0/testing/asserts.ts";
import Engine from "./src/Engine.ts";
import Player from "./src/Player.ts";
import State from "./src/State.ts";
import Board from "./src/Board.ts";
import PositionNavigator from "./src/PositionNavigator.ts";

Deno.test("a board with one chip has no winner", () => {
    const startState: State = new State([
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Red,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
    ], undefined);

    const board: Board = new Board(startState);

    const engine = new Engine(board);
    const state = engine.takeTurn(0, 0, Player.Red);

    assertEquals(state.winner, undefined);
});

Deno.test({name: "a board with two chips in a row has no winner", only: false}, () => {
    const startState: State = new State([
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Red,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
    ], undefined);

    const board: Board = new Board(startState);

    const engine = new Engine(board);
    engine.takeTurn(0, 0, Player.Red);
    const state = engine.takeTurn(0, 1, Player.Red);

    assertEquals(state.winner, undefined);
});

Deno.test("a board with four red chips in a row has a winner", () => {
    const startState: State = new State([
        [Player.Red,Player.Red,Player.Red,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
    ], undefined);

    const board: Board = new Board(startState);

    const engine = new Engine(board);
    const state = engine.takeTurn(0, 3, Player.Red);

    assertEquals(state.winner, Player.Red);
});

Deno.test("a board with four red chips in a row has a winner", () => {
    const startState: State = new State([
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Red,Player.Red,Player.Red],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
    ], undefined);

    const board: Board = new Board(startState);

    const engine = new Engine(board);
    const state = engine.takeTurn(0, 3, Player.Red);

    assertEquals(state.winner, Player.Red);
});

Deno.test("a board with four yellow chips in a row has a winner", () => {
    const startState: State = new State([
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Yellow,Player.Yellow,Player.Yellow],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
    ], undefined);

    const board: Board = new Board(startState);

    const engine = new Engine(board);
    const state = engine.takeTurn(0, 3, Player.Yellow);

    assertEquals(state.winner, Player.Yellow);
});

Deno.test("a board with three red chips and one yellow in a row does not have a winner", () => {
    const startState: State = new State([
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Yellow,Player.Red,Player.Red],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
    ], undefined);

    const board: Board = new Board(startState);

    const engine = new Engine(board);
    const state = engine.takeTurn(0, 3, Player.Red);

    assertEquals(state.winner, undefined);
});

Deno.test("the position navigator cant check a row that does not exist", () => {
    const navigator = new PositionNavigator(new State([[Player.Empty]], undefined), 0, 0, -1, 0);

    navigator.navigate();
})

Deno.test("the position navigator cant check a row that does not exist", () => {
    const navigator = new PositionNavigator(new State([
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty]
    ], undefined), 6, 0, 1, 0);

    navigator.navigate();
})

Deno.test("the position navigator cant check a column that does not exist", () => {
    const navigator = new PositionNavigator(new State([
        [Player.Empty],
        [Player.Empty],
        [Player.Empty],
        [Player.Empty],
        [Player.Empty],
        [Player.Empty]
    ], undefined), 0, 6, 0, 1);

    navigator.navigate();
})

Deno.test("a board with four red chips in a column has a winner", () => {
    const startState: State = new State([
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Red,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Red,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Red,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
    ], undefined);

    const board: Board = new Board(startState);

    const engine = new Engine(board);
    const state = engine.takeTurn(2, 0, Player.Red);

    assertEquals(state.winner, Player.Red);
});

Deno.test("a board with four yellow chips with a red chip before the last in a column does not have a winner", () => {
    const startState: State = new State([
        [Player.Red,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Red,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Red,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Yellow,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
    ], undefined);

    const board: Board = new Board(startState);

    const engine = new Engine(board);
    const state = engine.takeTurn(4, 0, Player.Red);

    assertEquals(state.winner, undefined);
});

Deno.test("a board with four red chips in a left horizontal has a winner", () => {
    const startState: State = new State([
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Red,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Red,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Red],
    ], undefined);

    const board: Board = new Board(startState);

    const engine = new Engine(board);
    const state = engine.takeTurn(2, 3, Player.Red);

    assertEquals(state.winner, Player.Red);
});

Deno.test("the engine yeilds the correct winnner with a complex game ", () => {
    const startState: State = new State([
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Yellow,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Yellow,Player.Empty,Player.Empty,Player.Red,Player.Empty,Player.Empty,Player.Empty],
        [Player.Yellow,Player.Red,Player.Red,Player.Red,Player.Red,Player.Empty,Player.Empty],
        [Player.Red,Player.Red,Player.Red,Player.Yellow,Player.Empty,Player.Red,Player.Empty],
        [Player.Red,Player.Yellow,Player.Yellow,Player.Yellow,Player.Empty,Player.Empty,Player.Red],
    ], undefined);

    const board: Board = new Board(startState);

    const engine = new Engine(board);
    const state = engine.takeTurn(2, 3, Player.Red);

    assertEquals(state.winner, Player.Red);
});

Deno.test("tokens are dropped to appropriate slot", () => {
    const startState: State = new State([
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
    ], undefined);

    const endState: State = new State([
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Red,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Red,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Red,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
    ], undefined);

    const board: Board = new Board(startState);

    const engine = new Engine(board);
    engine.dropToken(0, Player.Red);
    engine.dropToken(0, Player.Red);
    engine.dropToken(0, Player.Red);

    assertEquals(engine.board.state, endState);

});