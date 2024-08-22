import { IInputDevice } from "../Interfaces";

export class ControllerInput implements IInputDevice {
    private padIndex: number = -1;
    private eventListenerController: AbortController;

    constructor() {
        this.eventListenerController = new AbortController();
        if (this.eventListenerController) {
            this.eventListenerController.abort();
            this.eventListenerController = new AbortController();
        }

        const cancellationToken = { signal: this.eventListenerController.signal };

        window.addEventListener("gamepadconnected", (e) => {
            console.log('Gamepad connected');
            this.padIndex = (e as GamepadEvent).gamepad.index;
        }, cancellationToken);

        window.addEventListener("gamepaddisconnected", (e) => {
            console.log('Gamepad disconnected');
        }, cancellationToken);
    }

    public getCurrentActions(): Actions {
        const pad = navigator.getGamepads()[this.padIndex];

        if (!pad) {
            return { left: false, right: false, jump: false };
        }

        return {
            left: pad.buttons[14].pressed,
            right: pad.buttons[15].pressed,
            jump: pad.buttons[0].pressed,
        };
    }
}