import { ICharacteristic, IGameEntity, IUpdateContext } from "../Interfaces";

export class Controllable implements ICharacteristic {
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
            entity.velocityX -= 1;
        }

        if (requestedActions.right) {
            entity.velocityX += 1;
        }

        if (requestedActions.jump && entity.velocityY === 0) {
            entity.isJumping = true;
            entity.velocityY = 8;
        }

        if (!requestedActions.left && !requestedActions.right) {
            entity.velocityX = 0;
        }

        entity.velocityX = entity.velocityX > 5 ? 5 : entity.velocityX;
        entity.velocityX = entity.velocityX < -5 ? -5 : entity.velocityX;
    }
}
