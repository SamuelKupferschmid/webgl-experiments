import {Boomerang} from "./Boomerang";

let canvas = document.getElementsByTagName('canvas')[0];

let fpsLabel = document.getElementById('fps');

let context = canvas.getContext("webgl");

let boomerang = new Boomerang(context);

boomerang.run((fps) => {
    fpsLabel.innerText = fps.toFixed(0);
});