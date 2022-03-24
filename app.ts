import { clearScreen } from "https://denopkg.com/iamnathanj/cursor@v2.2.0/mod.ts";

import Engine from './src/Engine.ts'
import Board from './src/Board.ts'
import State from './src/State.ts'
import Player from './src/Player.ts'

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

const output = (positions: Array<Array<Player>>) => {
    let output = "You are Red\n\n-------------\n";

    positions.forEach(row => {
        row.forEach(col => {
            const formattedPlayer = col === Player.Empty ? "X" : col === Player.Red ? "R" : "Y"
            output += formattedPlayer + " "
        });
        output += "\n"
    });
    
    output += "-------------\n0 1 2 3 4 5 6\n\n"
    clearScreen().then(_ => console.log(output));
}

output(engine.board.state.positions);

const takeTurn = (engine: Engine) => {
    const input = prompt('Drop token in column: ');
    const playerState = engine.dropToken(Number(input), Player.Red);
    const aiState = engine.dropToken(Number(Math.floor(Math.random() * 6)), Player.Yellow);

    clearScreen().then(_ => {
        output(aiState.positions);

        if(aiState.winner === undefined && playerState.winner === undefined) {
            takeTurn(engine);
        }else{
            const winner = aiState.winner ? aiState.winner : playerState.winner;
            const formattedPlayer = winner === Player.Empty ? "X" : winner === Player.Red ? "Red" : "Yellow"

            console.log(`"\n\n We have a winner! Congratulations " + ${formattedPlayer}`);
        }
    });
}

takeTurn(engine);