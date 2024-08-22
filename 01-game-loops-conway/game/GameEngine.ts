import { IRenderer, IScene } from "./Interfaces";

export class GameEngine {
    private renderer: IRenderer;
    private scene: IScene;

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
        this.scene.update();
        this.scene.render(this.renderer);

        setTimeout(() => {
            window.requestAnimationFrame(() => this.gameLoop());
        }, 100)
    }
}
