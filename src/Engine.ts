import State from "./State.ts"
import Player from "./Player.ts"
import Board from "./Board.ts"
import PositionNavigator from "./PositionNavigator.ts"

export default class Engine {
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
        const colNavigator = new PositionNavigator(state, row, col, 1, 0);
        const leftDiagNavigator = new PositionNavigator(state, row, col, 1, -1);
        const rightDiagNavigator = new PositionNavigator(state, row, col, 1, 1);

        const isWinnerOfARowToTheLeft = this.checkInDirection(leftNavigator, player, 0) === player;
        const isWinnerOfARowToTheRight = this.checkInDirection(rightNavigator, player, 0) === player;
        const isWinnerOfACol = this.checkInDirection(colNavigator, player, 0) === player;
        const isWinnerOfLeftDiag = this.checkInDirection(leftDiagNavigator, player, 0) === player;
        const isWinnerOfRightDiag = this.checkInDirection(rightDiagNavigator, player, 0) === player;
        
        const winner = isWinnerOfARowToTheLeft || isWinnerOfARowToTheRight || isWinnerOfACol || isWinnerOfLeftDiag || isWinnerOfRightDiag ? player : undefined;

        return new State(state.positions, winner);
    }
}