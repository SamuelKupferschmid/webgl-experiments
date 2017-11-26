"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BoomerangScene_1 = require("./scenes/BoomerangScene");
var CylinderStreaming_1 = require("./scenes/CylinderStreaming");
var canvas = document.getElementsByTagName('canvas')[0];
var fpsLabel = document.getElementById('fps');
var updateCanvasSize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
updateCanvasSize();
//let scene = new BoomerangScene(canvas);
var scene;
function toogleScene() {
    if (scene != null)
        scene.stop();
    if (scene instanceof BoomerangScene_1.BoomerangScene) {
        scene = new CylinderStreaming_1.CylinderStreaming(canvas);
    }
    else {
        scene = new BoomerangScene_1.BoomerangScene(canvas);
    }
    scene.run(function (fps) {
        fpsLabel.innerText = fps.toFixed(0);
    });
}
window.addEventListener('resize', function () {
    updateCanvasSize();
}, false);
requestAnimationFrame(updateCanvasSize);
document.getElementById('toggle-button').addEventListener("click", toogleScene);
toogleScene();
//# sourceMappingURL=App.js.map