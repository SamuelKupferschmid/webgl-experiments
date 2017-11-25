import {BoomerangScene} from "./scenes/BoomerangScene";

let canvas = document.getElementsByTagName('canvas')[0];

let fpsLabel = document.getElementById('fps');

let boomerang = new BoomerangScene(canvas);

boomerang.run((fps) => {
    fpsLabel.innerText = fps.toFixed(0);
});


let updateCanvasSize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

window.addEventListener('resize', () => {
    updateCanvasSize();
}, false);

requestAnimationFrame(updateCanvasSize);