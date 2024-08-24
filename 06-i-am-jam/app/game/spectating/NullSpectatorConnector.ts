import { Game } from "../Game";
import { ISpectatorConnector } from "./ISpectatorConnector";

export class NullSpectatorConnector implements ISpectatorConnector {
    private lastState: string;

    public publish(game: Game) {
        const metadata = {
            id: game.player.id,
            name: game.playerName,
            x: game.player.x,
            y: game.player.y,
            isAlive: game.player.isAlive
        };

        const stateString = JSON.stringify(metadata);

        if (this.lastState && this.lastState === stateString) {
            return; // Don't publish the same state twice
        }

        this.lastState = JSON.stringify(metadata);
    }

    public subscribe(callback: (state: any) => void) {
    }
}
