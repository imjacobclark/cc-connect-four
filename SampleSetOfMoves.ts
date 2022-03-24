import Board from './src/Board.ts';
import Engine from './src/Engine.ts';
import State from './src/State.ts';
import Player from './src/Player.ts';
import PlayerFactory from './src/PlayerFactory.ts';

const lettersToIndex: Record<string, number> = {
    "A": 0,
    "B": 1,
    "C": 2,
    "D": 3,
    "E": 4,
    "F": 5,
    "G": 6,
}

const connectFour = (moves: Array<string>): Player | undefined => {
    const board = new Board(new State([
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
        [Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty,Player.Empty],
    ], undefined));

    const engine = new Engine(board);
   
    const allMoves = moves.map(move => {
        const colAndPlayer = move.split("_");

        return engine.dropToken(lettersToIndex[colAndPlayer[0]], PlayerFactory.getPlayer(colAndPlayer[1]));
    });

    return allMoves[allMoves.length - 1]?.winner;
    
}

console.log(PlayerFactory.getPlayerAsString(connectFour([
    "A_Red",
    "B_Yellow",
    "A_Red",
    "B_Yellow",
    "A_Red",
    "B_Yellow",
    "G_Red",
    "B_Yellow"
]) || Player.Empty));

console.log(PlayerFactory.getPlayerAsString(connectFour([
    "A_Red",
    "G_Yellow",
    "B_Red",
    "F_Yellow",
    "C_Red",
    "E_Yellow",
    "D_Red"
]) || Player.Empty));

console.log(PlayerFactory.getPlayerAsString(connectFour([
    "B_Yellow",
    "C_Red",
    "C_Yellow",
    "D_Red",
    "A_Yellow",
    "D_Red",
    "D_Yellow",
    "E_Red",
    "E_Yellow",
    "F_Red",
    "E_Yellow"
]) || Player.Empty));