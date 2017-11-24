import {BoomerangScene} from "./scenes/BoomerangScene";

let canvas = document.getElementsByTagName('canvas')[0];

let fpsLabel = document.getElementById('fps');

let context = canvas.getContext("webgl");

let boomerang = new BoomerangScene(context);

boomerang.run((fps) => {
    fpsLabel.innerText = fps.toFixed(0);
});