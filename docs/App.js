"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BoomerangScene_1 = require("./scenes/BoomerangScene");
var CylinderStreaming_1 = require("./scenes/CylinderStreaming");
var FlyingCuboidsScene_1 = require("./scenes/FlyingCuboidsScene");
var canvas = document.getElementsByTagName('canvas')[0];
var fpsLabel = document.getElementById('fps');
var updateCanvasSize = function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};
updateCanvasSize();
var scenes = {
    "Boomerang": BoomerangScene_1.BoomerangScene,
    "Cylinder Streaming": CylinderStreaming_1.CylinderStreaming,
    "Flying Cuboids": FlyingCuboidsScene_1.FlyingCuboidsScene
};
var scene;
window.addEventListener('resize', function () {
    updateCanvasSize();
}, false);
requestAnimationFrame(updateCanvasSize);
var menu = document.getElementsByClassName('menu')[0];
for (var name_1 in scenes) {
    var item = document.createElement('a');
    item.innerText = name_1;
    item.href = encodeURI('#' + name_1);
    menu.appendChild(item);
}
var onHashchange = function (url) {
    if (scene != null)
        scene.stop();
    var match = url.match(/#(.*)/);
    var type = match == null ? FlyingCuboidsScene_1.FlyingCuboidsScene : scenes[decodeURI(match[1])];
    scene = new type(canvas);
    scene.run(function (fps) {
        fpsLabel.innerText = fps.toFixed(0);
    });
};
window.addEventListener('hashchange', function (ev) {
    onHashchange(document.location.href);
});
onHashchange("");
//# sourceMappingURL=App.js.map