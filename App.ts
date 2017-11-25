import {BoomerangScene} from "./scenes/BoomerangScene";
import {CylinderStreaming} from "./scenes/CylinderStreaming";

let canvas = document.getElementsByTagName('canvas')[0];

let fpsLabel = document.getElementById('fps');

let updateCanvasSize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

updateCanvasSize();

let scene = new BoomerangScene(canvas);

//let scene = new CylinderStreaming(canvas);

scene.run((fps) => {
    fpsLabel.innerText = fps.toFixed(0);
});

window.addEventListener('resize', () => {
    updateCanvasSize();
}, false);

requestAnimationFrame(updateCanvasSize);