import {BoomerangScene} from "./scenes/BoomerangScene";
import {CylinderStreaming} from "./scenes/CylinderStreaming";

let canvas = document.getElementsByTagName('canvas')[0];

let fpsLabel = document.getElementById('fps');

let updateCanvasSize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

updateCanvasSize();



//let scene = new BoomerangScene(canvas);
let scene;

function toogleScene() {
    if(scene != null)
        scene.stop();

    if(scene instanceof BoomerangScene) {
        scene = new CylinderStreaming(canvas);
    } else {
        scene = new BoomerangScene(canvas);
    }

    scene.run((fps) => {
        fpsLabel.innerText = fps.toFixed(0);
    });
}

window.addEventListener('resize', () => {
    updateCanvasSize();
}, false);

requestAnimationFrame(updateCanvasSize);

document.getElementById('toggle-button').addEventListener("click",toogleScene);
toogleScene();