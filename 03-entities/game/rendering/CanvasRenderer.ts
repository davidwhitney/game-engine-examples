import { IGameEntity, IRenderer } from "../Interfaces";

export class CanvasRenderer implements IRenderer {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d')!;
    }

    public clearScreen() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public drawRect(x: number, y: number, width: number, height: number, color: string = "#000000") {
        this.context.fillStyle = color;

        const invertedY = this.canvas.height - y - height;
        this.context.fillRect(x, invertedY, width, height);
    }

    public draw(entity: IGameEntity) {
        this.drawRect(entity.x, entity.y, entity.width, entity.height, entity.color);
    }
}
