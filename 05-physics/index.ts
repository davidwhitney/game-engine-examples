import { ControllerInput } from "./game/controls/ControllerInput";
import { KeyboardInput } from "./game/controls/KeyboardInput";
import { GameEngine } from "./game/GameEngine";
import { CanvasRenderer } from "./game/rendering/CanvasRenderer";
import { LevelScene } from "./game/scenes/DavidWasAlone/LevelScene";

const canvas = document.getElementById('canvas')! as HTMLCanvasElement;
const renderer = new CanvasRenderer(canvas);
const engine = new GameEngine(renderer);

engine.connectInputDevice(new KeyboardInput());
engine.connectInputDevice(new ControllerInput());
engine.setScene(new LevelScene());
engine.start();
