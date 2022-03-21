import State from "./State.ts";

export default class Board {
    state: State;

    constructor(state: State){
        this.state = state;
    }
}