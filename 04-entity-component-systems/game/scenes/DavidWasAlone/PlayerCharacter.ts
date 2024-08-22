import { Controllable } from "../../characteristics/Controllable";
import { IGameEntity, ICharacteristic } from "../../Interfaces";

export class PlayerCharacter implements IGameEntity {
    public x: number = 100;
    public y: number = 100;
    public width: number = 50;
    public height: number = 50;
    public color: string = "#FF0000";

    public characteristics: ICharacteristic[] = [
        new Controllable()
    ];
}