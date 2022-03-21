import Player from "./Player.ts";

export default class PlayerFactory {
    static getPlayer(player: string): Player {
        if(player === "red") return Player.Red
        if(player === "yellow") return Player.Yellow
        
        return Player.Empty
    }
}