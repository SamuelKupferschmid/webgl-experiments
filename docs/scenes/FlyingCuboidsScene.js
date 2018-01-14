"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var FragmentShader = require("../shaders/main.frag");
var VertexShader = require("../shaders/main.vert");
var BaseScene_1 = require("./BaseScene");
var ShaderProgram_1 = require("../ShaderProgram");
var Mat4_1 = require("../math/Mat4");
var Vec3_1 = require("../math/Vec3");
var GyroDynamics_1 = require("../GyroDynamics");
var ShapeBuilder_1 = require("../ShapeBuilder");
var FlyingCuboidsScene = /** @class */ (function (_super) {
    __extends(FlyingCuboidsScene, _super);
    function FlyingCuboidsScene(canvas) {
        var _this = _super.call(this, canvas) || this;
        _this.mMatrix = Mat4_1.Mat4.ID;
        _this.a = new Vec3_1.Vec3(1, 10, 1); // Camera Position
        _this.b = new Vec3_1.Vec3(0, 0, 2); // Look At
        _this.up = new Vec3_1.Vec3(0, 1, 1); // up
        _this.t = 0;
        _this.dt = 0.000005;
        _this.x = 0;
        _this.dx = 0.10;
        _this.dim = [1, 1, 1];
        _this.translate = true;
        _this.rotate = true;
        _this.gyro = new GyroDynamics_1.GyroDynamics(0.2, 0.2, 0.2);
        _this._program = new ShaderProgram_1.ShaderProgram(_this._context, VertexShader, FragmentShader);
        _this._program.use();
        var buffer = _this._context.createBuffer();
        _this._context.bindBuffer(_this._context.ARRAY_BUFFER, buffer);
        _this._context.bufferData(_this._context.ARRAY_BUFFER, new Float32Array(ShapeBuilder_1.ShapeBuilder.GetCuboid()), _this._context.STATIC_DRAW);
        _this._context.vertexAttribPointer(_this._program.aPosition, 3, _this._context.FLOAT, false, 0, 0);
        _this._context.enableVertexAttribArray(_this._program.aPosition);
        _this.vMatrix = Mat4_1.Mat4.lookAt(_this.a, _this.b, _this.up);
        _this._program.V = _this.vMatrix;
        _this._program.P = _this.pMatrix;
        _this.resetMovement([1, 1, 1]);
        window.addEventListener('keypress', function (ev) { return _this.keypress(ev); });
        return _this;
    }
    FlyingCuboidsScene.prototype.drawFrame = function (frame, msDuration) {
        var gl = this._context;
        gl.clearColor(0.0, 1.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        this._program.setColor(1, 0, 0, 1);
        var state = this.gyro.state;
        this.gyro.move(this.t);
        if (this.translate) {
            this.x += this.dx;
        }
        if (this.rotate) {
            this.t += this.dt;
        }
        var m = Mat4_1.Mat4.ID
            .multiply(Mat4_1.Mat4.scale(this.dim[0], this.dim[1], this.dim[2]))
            .multiply(Mat4_1.Mat4.translate(this.x, 0, 0))
            .multiply(Mat4_1.Mat4.rotate(state.phi, state.x, state.y, state.z));
        this._program.M = m;
        gl.drawArrays(gl.TRIANGLES, 0, 36);
    };
    FlyingCuboidsScene.prototype.keypress = function (ev) {
        switch (ev.key) {
            case 's':
                this.translate = !this.translate;
                break;
            case 'r':
                this.rotate = !this.rotate;
                break;
            case '1':
                this.resetMovement([0.4, 0.4, 0.4]);
                break;
            case '2':
                this.resetMovement([0.2, 1, 0.1]);
                break;
            case '3':
                this.resetMovement([1, 0.5, 2]);
                break;
            case '4':
                this.resetMovement([1, 0.4, 0.3]);
                break;
        }
    };
    FlyingCuboidsScene.prototype.resetMovement = function (dimensions) {
        this.dim = dimensions;
        this.x = 0;
        this.t = 0;
        this.gyro.state = {
            x: 1,
            y: 1,
            z: 1,
            w1: Math.random() - 0.5,
            w2: Math.random() - 0.5,
            w3: Math.random() - 0.5,
            phi: 1
        };
    };
    return FlyingCuboidsScene;
}(BaseScene_1.BaseScene));
exports.FlyingCuboidsScene = FlyingCuboidsScene;
//# sourceMappingURL=FlyingCuboidsScene.js.map