"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Mat4_1 = require("../math/Mat4");
var BaseScene = /** @class */ (function () {
    function BaseScene(canvas) {
        var _this = this;
        this.near = -10;
        this.far = 1000;
        this.onResizeFramed = function () {
            requestAnimationFrame(function () {
                _this.onResize(_this._canvas.width, _this._canvas.height);
            });
        };
        this._context = canvas.getContext("webgl");
        this._canvas = canvas;
        this.onResize(canvas.width, canvas.height);
        window.addEventListener('resize', this.onResizeFramed, false);
    }
    BaseScene.prototype.run = function (fpsCb) {
        var _this = this;
        this.isRunning = true;
        var frame = 0;
        var msStart = Date.now();
        var lastTick = 0;
        var anim = function () {
            var msDuration = Date.now() - msStart;
            if (frame % 20 == 0) {
                var fps = 1000 / (msDuration - lastTick);
                fpsCb(fps);
            }
            _this.drawFrame(frame++, msDuration);
            lastTick = msDuration;
            _this.nextAnimFrame = requestAnimationFrame(anim);
        };
        this.nextAnimFrame = requestAnimationFrame(anim);
    };
    BaseScene.prototype.stop = function () {
        cancelAnimationFrame(this.nextAnimFrame);
        window.removeEventListener('resize', this.onResizeFramed);
    };
    BaseScene.prototype.onResize = function (width, height) {
        this._context.viewport(0, 0, width, height);
        var aspect = width / height;
        this.pMatrix = Mat4_1.Mat4.perspective2(Math.PI / 3, aspect, 1, 1000);
        //this.pMatrix = Mat4.perspective(left, right, top, bottom, this.near, this.far);
    };
    return BaseScene;
}());
exports.BaseScene = BaseScene;
//# sourceMappingURL=BaseScene.js.map