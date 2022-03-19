import { assertEquals } from "https://deno.land/std@0.130.0/testing/asserts.ts";

const NUM_OF_ROWS = 6;
const NUM_OF_COLS = 7;

enum Player {
    Red,
    Yellow,
    Empty
}


class State {
    positions: Array<Array<Player>>;
    winner?: Player = undefined;
    constructor(positions: Array<Array<Player>>, winner?: Player){
        this.positions = positions;
        this.winner = winner;
    }
}

class Board {
    state: State;
    constructor(state: State){
        this.state = state;
    }
}

class PositionNavigator {
    state: State; 
    row: number; 
    col: number; 
    rowDirection: number; 
    colDirection: number;

    constructor(state: State, row: number, col: number, rowDirection: number, colDirection: number){
        this.state = state;
        this.row = row;
        this.col = col;
        this.rowDirection = rowDirection;
        this.colDirection = colDirection;
    }

    private validatePosition(navigatable: number, limit: number): boolean{
        return !(navigatable < 0 || navigatable > limit)
    }


    navigate(){
        const rowToNavigateTo = this.row + this.rowDirection;
        const colToNavigateTo = this.col + this.colDirection;
        const navigatedRowIsValid = this.validatePosition(rowToNavigateTo, NUM_OF_ROWS);
        const navigatedColIsValid = this.validatePosition(colToNavigateTo, NUM_OF_COLS);

        return navigatedRowIsValid && navigatedColIsValid ? this.state.positions[rowToNavigateTo][colToNavigateTo] : undefined;
    }
}

class Engine {
    board: Board
    constructor(board: Board){
        this.board = board;
    }

    private checkInDirection(navigator: PositionNavigator, player: Player, count: number): Player | undefined {
        const positionToCheckPlayer = navigator.navigate();

        if(positionToCheckPlayer === undefined) return undefined;

        if(positionToCheckPlayer === player) {
            if(count === 2){
                return player;
            }

            return this.checkInDirection(navigator, player, count + 1)
        }

        return undefined;
    }

    public takeTurn(row: number, col: number, player: Player){
        const state = this.board.state;
        state.positions[row][col] = player;

        const leftNavigator = new PositionNavigator(state, row, col, 0, -1);
        const rightNavigator = new PositionNavigator(state, row, col, 0, 1);

        const isWinnerOfARowToTheLeft = this.checkInDirection(leftNavigator, player, 0) === player;
        const isWinnerOfARowToTheRight = this.checkInDirection(rightNavigator, player, 0) === player;
        
        const winner = isWinnerOfARowToTheLeft || isWinnerOfARowToTheRight ? player : undefined;

        return new State(state.positions, winner);
    }
}

Deno.test("a board with one chip has no winner", () => {
    const startState: State = new State([
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
    ], undefined);

    const board: Board = new Board(startState);

    const engine = new Engine(board);
    const state = engine.takeTurn(0, 0, Player.Red);

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