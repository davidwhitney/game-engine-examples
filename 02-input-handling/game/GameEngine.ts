import { IInputDevice, IRenderer, IScene } from "./Interfaces";

export class GameEngine {
    private renderer: IRenderer;
    private scene: IScene;
    private inputDevices: IInputDevice[] = [];

    constructor(renderer: IRenderer) {
        this.renderer = renderer;
    }

    public setScene(scene: IScene) {
        this.scene = scene;
    }

    public start() {
        this.scene.init();
        window.requestAnimationFrame(() => this.gameLoop());
    }

    public gameLoop() {
        this.scene.update(this.inputDevices);
        this.scene.render(this.renderer);
        window.requestAnimationFrame(() => this.gameLoop());
    }

    public connectInputDevice(inputDevice: IInputDevice) {
        this.inputDevices.push(inputDevice);
    }
}
