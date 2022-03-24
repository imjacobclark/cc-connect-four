import State from "./State.ts"

const NUM_OF_ROWS = 6;
const NUM_OF_COLS = 7;

export default class PositionNavigator {
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

    private validatePosition(navigatable: number, limit: number): boolean {
        return !(navigatable < 0 || navigatable > limit)
    }


    navigate(){
        const rowToNavigateTo = this.row + this.rowDirection;
        const colToNavigateTo = this.col + this.colDirection;
        const navigatedRowIsValid = this.validatePosition(rowToNavigateTo, NUM_OF_ROWS);
        const navigatedColIsValid = this.validatePosition(colToNavigateTo, NUM_OF_COLS);

        if(navigatedRowIsValid && navigatedColIsValid && this.state.positions[rowToNavigateTo] !== undefined && this.state.positions[rowToNavigateTo][colToNavigateTo] !== undefined) {
            this.row = rowToNavigateTo;
            this.col = colToNavigateTo;
            return this.state.positions[rowToNavigateTo][colToNavigateTo] 
        }else{
            return undefined
        }
    }
}