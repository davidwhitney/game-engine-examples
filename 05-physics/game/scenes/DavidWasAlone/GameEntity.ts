import { ICharacteristic, IGameEntity } from "../../Interfaces";

export abstract class GameEntity implements IGameEntity {
    public x: number = 0;
    public y: number = 0;
    public width: number = 0;
    public height: number = 0;
    public color: string = "#FF0000";

    public velocityX: number = 0;
    public velocityY: number = 0;
    public weight: number = 0;

    public isJumping: boolean = false;

    public characteristics: ICharacteristic[] = [];
}
