export class ConwaysGameOfLife implements IScene {
    private numColumns = 75;
    private numRows = 40;

    private world: boolean[][] = [];

    public init(): void {
        for (let y = 0; y < this.numRows; y++) {
            this.world.push([]);

            for (let x = 0; x < this.numColumns; x++) {
                this.world[y].push(Math.random() > 0.5);
            }
        }
    }

    public update(): void {
        const nextState = structuredClone(this.world);

        for (let { x, y } of this.allCells()) {

            const neighbouringCells = [
                [x - 1, y - 1],
                [x, y - 1],
                [x + 1, y - 1],
                [x - 1, y],
                [x + 1, y],
                [x - 1, y + 1],
                [x, y + 1],
                [x + 1, y + 1]
            ];

            const livingNeighbours = neighbouringCells.reduce((aliveCount: number, [x, y]) => {
                if (x < 0 || x >= this.numColumns || y < 0 || y >= this.numRows) {
                    return aliveCount;
                }

                const isAlive = this.world[y][x];
                return aliveCount + (isAlive ? 1 : 0);
            }, 0);

            if (livingNeighbours == 2) {
                nextState[y][x] = this.world[y][x];
            } else if (livingNeighbours == 3) {
                nextState[y][x] = true;
            } else {
                nextState[y][x] = false;
            }
        }

        this.world = nextState;
    }

    public render(renderer: IRenderer): void {
        const CELL_WIDTH = 10;
        const CELL_HEIGHT = 10;

        renderer.clearScreen();

        for (let { x, y } of this.allCells()) {
            const isAlive = this.world[y][x];
            const cellColour = isAlive ? "black" : "teal";
            renderer.drawRect(x * CELL_WIDTH, y * CELL_HEIGHT, CELL_WIDTH, CELL_HEIGHT, cellColour);
        }
    }

    private *allCells() {
        for (let y = 0; y < this.numRows; y++) {
            for (let x = 0; x < this.numColumns; x++) {
                yield { x, y };
            }
        }
    }
}
