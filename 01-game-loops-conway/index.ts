import { GameEngine } from "./game/GameEngine";
import { CanvasRenderer } from "./game/rendering/CanvasRenderer";
import { ConwaysGameOfLife } from "./game/scenes/ConwaysGameOfLife";

const canvas = document.getElementById('canvas')! as HTMLCanvasElement;
const renderer = new CanvasRenderer(canvas);
const engine = new GameEngine(renderer);

engine.setScene(new ConwaysGameOfLife());
engine.start();