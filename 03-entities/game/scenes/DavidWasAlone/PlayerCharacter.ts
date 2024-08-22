import { IInputDevice, IGameEntity, IRenderer } from "../../Interfaces";

export class PlayerCharacter implements IGameEntity {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public color: string

    constructor() {
        this.x = 100;
        this.y = 100;
        this.width = 50;
        this.height = 50;
        this.color = "#FF0000";
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
            this.x -= 5;
        }

        if (requestedActions.right) {
            this.x += 5;
        }
    }
}