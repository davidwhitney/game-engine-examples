export interface IScene {
    init(): void;
    update(): void;
    render(renderer: IRenderer): void;
}

export interface IRenderer {
    clearScreen(): void;
    drawRect(x: number, y: number, width: number, height: number, color: string): void;
}
