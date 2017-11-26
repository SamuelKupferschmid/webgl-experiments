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
var BoomerangModel = require("../models/boomerang.json");
var BaseScene_1 = require("./BaseScene");
var ShaderProgram_1 = require("../ShaderProgram");
var Mat4_1 = require("../math/Mat4");
var Vec3_1 = require("../math/Vec3");
var BoomerangScene = /** @class */ (function (_super) {
    __extends(BoomerangScene, _super);
    function BoomerangScene(canvas) {
        var _this = _super.call(this, canvas) || this;
        _this.mMatrix = Mat4_1.Mat4.ID;
        _this.roundtripDurationMs = 5000;
        _this.roundtripRadius = 2.1;
        _this.rotationDuration = 300;
        _this.a = new Vec3_1.Vec3(0, 4, 0); // Camera Position
        _this.b = new Vec3_1.Vec3(0, 0, 2); // Look At
        _this.up = new Vec3_1.Vec3(0, 1, 1); // up
        _this._program = new ShaderProgram_1.ShaderProgram(_this._context, VertexShader, FragmentShader);
        _this._program.use();
        _this.boomerangVertices = new Float32Array(BoomerangModel.map(function (v) { return v * 0.04; }));
        var buffer = _this._context.createBuffer();
        _this._context.bindBuffer(_this._context.ARRAY_BUFFER, buffer);
        _this._context.bufferData(_this._context.ARRAY_BUFFER, _this.boomerangVertices, _this._context.STATIC_DRAW);
        _this._context.vertexAttribPointer(_this._program.aPosition, 2, _this._context.FLOAT, false, 0, 0);
        _this._context.enableVertexAttribArray(_this._program.aPosition);
        _this.vMatrix = Mat4_1.Mat4.lookAt(_this.a, _this.b, _this.up);
        _this._program.V = _this.vMatrix;
        _this._program.P = _this.pMatrix;
        return _this;
    }
    BoomerangScene.prototype.drawFrame = function (frame, msDuration) {
        var gl = this._context;
        gl.clearColor(0.0, 1.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        this._program.setColor(0.2, 1, 1, 1);
        var n = 10;
        var roundTripAngle = (msDuration / this.roundtripDurationMs) * 2 * Math.PI;
        var rotationAngle = (msDuration / this.rotationDuration) * 2 * Math.PI;
        for (var i = 0; i < n; i++) {
            var offsetAngle = 2 * Math.PI * i / n;
            this._program.M = this.mMatrix
                .rotate(-rotationAngle, 0, 0, 1)
                .rotate(-Math.PI / 3, 0, 1, 0)
                .translate(this.roundtripRadius, 0, 1)
                .rotate(roundTripAngle + offsetAngle, 0, 0, 1);
            gl.drawArrays(gl.TRIANGLE_FAN, 0, this.boomerangVertices.length / 2);
        }
    };
    BoomerangScene.prototype.onResize = function (width, height) {
        _super.prototype.onResize.call(this, width, height);
        if (this._program != undefined)
            this._program.P = this.pMatrix;
    };
    return BoomerangScene;
}(BaseScene_1.BaseScene));
exports.BoomerangScene = BoomerangScene;
//# sourceMappingURL=BoomerangScene.js.map