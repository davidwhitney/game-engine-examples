import { IGameEntity, IUpdateContext } from "../Interfaces";

export class Controllable {
    public update(context: IUpdateContext, entity: IGameEntity) {
        const defaultInput = { left: false, right: false, jump: false };
        const requestedActions = context.inputDevices.map(inputDevice => inputDevice.getCurrentActions()).reduce((acc, actions) => {
            return {
                left: acc.left || actions.left,
                right: acc.right || actions.right,
                jump: acc.jump || actions.jump,
            };
        }, defaultInput);

        if (requestedActions.left) {
            entity.x -= 5;
        }

        if (requestedActions.right) {
            entity.x += 5;
        }
    }
}