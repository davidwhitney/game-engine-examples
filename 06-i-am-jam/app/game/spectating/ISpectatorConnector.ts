import { Game } from "../Game";

export interface ISpectatorConnector {
    publish(game: Game);
    subscribe(callback: (state: any) => void);
}
