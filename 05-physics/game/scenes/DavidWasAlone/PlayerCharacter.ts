import { Controllable } from "../../characteristics/Controllable";
import { PhysicsObject } from "../../characteristics/PhysicsObject";
import { ICharacteristic } from "../../Interfaces";
import { GameEntity } from "./GameEntity";

export class PlayerCharacter extends GameEntity {
    public characteristics: ICharacteristic[] = [
        new Controllable(),
        new PhysicsObject()
    ];

    constructor() {
        super();
        this.x = 100;
        this.y = 1000;
        this.width = 50;
        this.height = 50;
        this.color = "#FF0000";

        this.weight = 2;
    }
}
