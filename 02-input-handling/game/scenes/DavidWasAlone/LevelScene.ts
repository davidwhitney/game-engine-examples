import { IInputDevice, IRenderer, IScene } from "../../Interfaces";

type PlayerCharacter = { x: number, y: number, width: number, height: number, color: string };

export class LevelScene implements IScene {
    private playerCharacter: PlayerCharacter;

    public init(): void {
        this.playerCharacter = {
            x: 100,
            y: 100,
            width: 50,
            height: 50,
            color: 'red'
        };
    }

    public update(inputDevices: IInputDevice[]): void {
        const defaultInput = { left: false, right: false, jump: false };
        const requestedActions = inputDevices.map(inputDevice => inputDevice.getCurrentActions()).reduce((acc, actions) => {
            return {
                left: acc.left || actions.left,
                right: acc.right || actions.right,
                jump: acc.jump || actions.jump,
            };
        }, defaultInput);

        if (requestedActions.left) {
            this.playerCharacter.x -= 5;
        }

        if (requestedActions.right) {
            this.playerCharacter.x += 5;
        }
    }

    public render(renderer: IRenderer): void {
        renderer.clearScreen();
        renderer.drawRect(this.playerCharacter.x, this.playerCharacter.y, this.playerCharacter.width, this.playerCharacter.height, this.playerCharacter.color);
    }
}

