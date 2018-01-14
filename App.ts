import {BoomerangScene} from "./scenes/BoomerangScene";
import {CylinderStreaming} from "./scenes/CylinderStreaming";
import {FlyingCuboidsScene} from './scenes/FlyingCuboidsScene';

let canvas = document.getElementsByTagName('canvas')[0];

let fpsLabel = document.getElementById('fps');

let updateCanvasSize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

updateCanvasSize();

let scenes = {
    "Boomerang" : BoomerangScene,
    "Cylinder Streaming": CylinderStreaming,
    "Flying Cuboids": FlyingCuboidsScene
};

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

let menu = document.getElementsByClassName('menu')[0];

for(let name in scenes) {
    let item = document.createElement('a');
    item.innerText = name;
    item.href = encodeURI('#' + name);
    menu.appendChild(item);
}

let onHashchange = (url: string) => {
    if(scene != null)
        scene.stop();

    let match = url.match(/#(.*)/);

    let type = match == null ? BoomerangScene : scenes[decodeURI(match[1])];

    scene = new type(canvas);

    scene.run((fps) => {
        fpsLabel.innerText = fps.toFixed(0);
    });
};

window.addEventListener('hashchange', ev => {
    onHashchange(ev.newURL);
});