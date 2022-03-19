import { assertEquals } from "https://deno.land/std@0.130.0/testing/asserts.ts";

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

    navigate(){
        return this.state.positions[this.row+this.rowDirection][this.col+this.colDirection];
    }
}

class Engine {
    board: Board
    constructor(board: Board){
        this.board = board;
    }

    private checkInDirection(navigator: PositionNavigator, player: Player, count: number): Player | undefined {
        const positionToCheckPlayer = navigator.navigate();

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