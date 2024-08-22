import { Actions } from "./controls/Actions";

export interface IScene extends IUpdatable {
    init(): void;
    render(context: IUpdateContext): void;
}

export interface IRenderer {
    clearScreen(): void;
    drawRect(x: number, y: number, width: number, height: number, color: string): void;
    draw(entity: IGameEntity): void;
}

export interface IInputDevice {
    getCurrentActions(): Actions;
}

export interface IUpdatable extends IMaybeUpdatable {
    update(context: IUpdateContext): void;
}

export interface IMaybeUpdatable {
    update?(context: IUpdateContext): void;
}

export interface IGameEntity extends IMaybeUpdatable {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;

    characteristics: ICharacteristic[];
}

export interface IUpdateContext {
    inputDevices: IInputDevice[];
    renderer: IRenderer;
}

export interface ICharacteristic {
    update(context: IUpdateContext, entity: IGameEntity): void;
}