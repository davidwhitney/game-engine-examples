import { IInputDevice } from "../Interfaces";

export class KeyboardInput implements IInputDevice {
    private pressedKeys: Set<number> = new Set();
    private eventListenerController: AbortController;

    constructor() {
        this.eventListenerController = new AbortController();
        if (this.eventListenerController) {
            this.eventListenerController.abort();
            this.eventListenerController = new AbortController();
        }

        const cancellationToken = { signal: this.eventListenerController.signal };

        window.addEventListener("keydown", (keyInfo) => {
            if (this.pressedKeys.has(keyInfo.keyCode)) {
                return;
            }
            this.pressedKeys.add(keyInfo.keyCode);
        }, cancellationToken);

        window.addEventListener("keyup", (keyInfo) => {
            this.pressedKeys.delete(keyInfo.keyCode);
        }, cancellationToken);
    }

    public getCurrentActions(): Actions {
        return {
            left: this.pressedKeys.has(65) || this.pressedKeys.has(37),
            right: this.pressedKeys.has(68) || this.pressedKeys.has(39),
            jump: this.pressedKeys.has(32),
        };
    }
}
