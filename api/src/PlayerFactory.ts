import Player from "./Player.ts";

export default class PlayerFactory {
    static getPlayer(player: string): Player {
        if(player === "Red") return Player.Red
        if(player === "Yellow") return Player.Yellow
        
        return Player.Empty
    }

    static getPlayerAsString(player: Player): string {
        if(player === Player.Red) return "Red"
        if(player === Player.Yellow) return "Yellow"
        
        return "No winner"
    }
}