import { Actions } from "./controls/Actions";

export interface IScene extends IUpdatable {
    init(): void;
    render(renderer: IRenderer): void;
}

export interface IRenderer {
    clearScreen(): void;
    drawRect(x: number, y: number, width: number, height: number, color: string): void;
    draw(entity: IGameEntity): void;
}

export interface IInputDevice {
    getCurrentActions(): Actions;
}

export interface IUpdatable {
    update(inputDevices: IInputDevice[]): void;
}

export interface IGameEntity extends IUpdatable {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
}
