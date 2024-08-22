import { IGameEntity, IInputDevice, IRenderer, IScene, IUpdatable, IUpdateContext } from "../../Interfaces";
import { PlayerCharacter } from "./PlayerCharacter";

export class LevelScene implements IScene {
    private entities: IGameEntity[] = [];

    public init(): void {
        this.entities.push(new PlayerCharacter());
    }

    public update(context: IUpdateContext): void {
        for (const entity of this.entities) {
            for (const characteristic of entity.characteristics) {
                characteristic.update(context, entity);
            }

            if (entity.update) {
                entity.update(context);
            }
        }
    }

    public render(context: IUpdateContext): void {
        context.renderer.clearScreen();
        this.entities.forEach(entity => context.renderer.draw(entity));
    }
}
