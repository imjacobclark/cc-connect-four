import Player from "./Player.ts";

export default class State {
    positions: Array<Array<Player>>;
    winner?: Player = undefined;

    constructor(positions: Array<Array<Player>>, winner?: Player){
        this.positions = positions;
        this.winner = winner;
    }
}