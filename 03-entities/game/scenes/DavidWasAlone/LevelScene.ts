import { IGameEntity, IInputDevice, IRenderer, IScene, IUpdatable } from "../../Interfaces";
import { PlayerCharacter } from "./PlayerCharacter";

export class LevelScene implements IScene {
    private entities: IGameEntity[] = [];

    public init(): void {
        this.entities.push(new PlayerCharacter());
    }

    public update(inputDevices: IInputDevice[]): void {
        this.entities.forEach(entity => entity.update(inputDevices));
    }

    public render(renderer: IRenderer): void {
        renderer.clearScreen();
        this.entities.forEach(entity => renderer.draw(entity));
    }
}
