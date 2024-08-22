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
        const updateContext = {
            inputDevices: this.inputDevices,
            renderer: this.renderer
        };

        this.scene.update(updateContext);
        this.scene.render(updateContext);
        window.requestAnimationFrame(() => this.gameLoop());
    }

    public connectInputDevice(inputDevice: IInputDevice) {
        this.inputDevices.push(inputDevice);
    }
}
