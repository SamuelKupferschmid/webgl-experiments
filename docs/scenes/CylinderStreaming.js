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
var BaseScene_1 = require("./BaseScene");
var VerticesUtils_1 = require("../VerticesUtils");
var ShaderProgram_1 = require("../ShaderProgram");
var Mat4_1 = require("../math/Mat4");
var Dynamics_1 = require("../Dynamics");
var CylinderStreaming = /** @class */ (function (_super) {
    __extends(CylinderStreaming, _super);
    function CylinderStreaming(canvas) {
        var _this = _super.call(this, canvas) || this;
        _this.mousePos = [0, 0];
        _this._cylinder = new Float32Array(VerticesUtils_1.VerticesUtils.createCirlcePoints(32));
        _this._cylinderProgram = new ShaderProgram_1.ShaderProgram(_this._context, ShaderProgram_1.ShaderProgram.DEFAULT_VSHADER, ShaderProgram_1.ShaderProgram.DEFAULT_FSHADER);
        _this._cylinderProgram.use();
        var buffer = _this._context.createBuffer();
        _this._context.bindBuffer(_this._context.ARRAY_BUFFER, buffer);
        _this._context.bufferData(_this._context.ARRAY_BUFFER, _this._cylinder, _this._context.STATIC_DRAW);
        _this._context.vertexAttribPointer(_this._cylinderProgram.aPosition, 2, _this._context.FLOAT, false, 0, 0);
        _this._context.enableVertexAttribArray(_this._cylinderProgram.aPosition);
        _this.vMatrix = Mat4_1.Mat4.ID; //.lookAt(this.a, this.b, this.up);
        _this._cylinderProgram.V = _this.vMatrix;
        _this._cylinderProgram.P = _this.pMatrix;
        _this._cylinderProgram.M = Mat4_1.Mat4.ID;
        _this._streamProgram = new ShaderProgram_1.ShaderProgram(_this._context, ShaderProgram_1.ShaderProgram.DEFAULT_VSHADER, ShaderProgram_1.ShaderProgram.DEFAULT_FSHADER);
        _this._streamProgram.use();
        _this.streamBuffer = _this._context.createBuffer();
        _this._context.bindBuffer(_this._context.ARRAY_BUFFER, _this.streamBuffer);
        _this._context.bufferData(_this._context.ARRAY_BUFFER, new Float32Array(20), _this._context.DYNAMIC_DRAW);
        _this._context.vertexAttribPointer(_this._streamProgram.aPosition, 2, _this._context.FLOAT, false, 0, 0);
        _this._context.enableVertexAttribArray(_this._streamProgram.aPosition);
        _this._streamProgram.V = _this.vMatrix;
        _this._streamProgram.P = _this.pMatrix;
        _this._streamProgram.M = Mat4_1.Mat4.ID;
        return _this;
    }
    CylinderStreaming.prototype.drawFrame = function (frame, msDuration) {
        var gl = this._context;
        var position = this.mousePos;
        gl.clearColor(0.0, 1.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        this._cylinderProgram.use();
        this._cylinderProgram.setColor(0.2, 0.2, 1, 1);
        this._context.bufferData(this._context.ARRAY_BUFFER, this._cylinder, this._context.DYNAMIC_DRAW);
        this._context.drawArrays(this._context.TRIANGLE_FAN, 0, this._cylinder.length / 2);
        this._streamProgram.use();
        this._streamProgram.setColor(0, 0, 1, 1);
        var l = -2 * this.viewWidth;
        var r = -l;
        var top = this.viewHeight;
        var bottom = -top;
        var yCount = 50;
        var yStep = (top - bottom) / yCount;
        for (var y = top + yStep * 0.5; y >= bottom; y -= yStep) {
            var n = this.createStreamingLineVertices([l, y], [l, r, top, bottom]);
            this._context.bufferData(this._context.ARRAY_BUFFER, n, this._context.DYNAMIC_DRAW);
            this._context.drawArrays(this._context.LINE_STRIP, 0, n.length / 2);
        }
    };
    CylinderStreaming.prototype.streamline = function (x) {
        var radius = 1;
        var radiusSquare = Math.pow(radius, 2);
        var xSquare = Math.pow(x[0], 2);
        var ySquare = Math.pow(x[1], 2);
        return [
            1 + radiusSquare / (xSquare + ySquare)
                - (2 * radiusSquare * xSquare) / Math.pow(xSquare + ySquare, 2),
            -(2 * radiusSquare * x[0] * x[1]) / Math.pow(xSquare + ySquare, 2)
        ];
    };
    CylinderStreaming.prototype.createStreamingLineVertices = function (start, bounderies) {
        var dt = 0.05;
        var _a = bounderies.slice(), left = _a[0], right = _a[1], top = _a[2], bottom = _a[3];
        var _b = start.slice(), x = _b[0], y = _b[1];
        var vertices = [];
        do {
            _c = Dynamics_1.Dynamics.runge([x, y], dt, this.streamline).slice(), x = _c[0], y = _c[1];
            vertices.push(x);
            vertices.push(y);
        } while (x > left && x < right && y < top && y > bottom);
        return new Float32Array(vertices);
        var _c;
    };
    CylinderStreaming.prototype.onResize = function (width, height) {
        this._context.viewport(0, 0, width, height);
        this.viewHeight = 10;
        this.viewWidth = this.viewHeight * width / height;
        this.pMatrix = Mat4_1.Mat4.ortho(-this.viewWidth / 2, this.viewWidth / 2, -this.viewHeight / 2, this.viewHeight / 2, -60, 1000);
        if (this._cylinderProgram != undefined) {
            this._cylinderProgram.use();
            this._cylinderProgram.P = this.pMatrix;
        }
        if (this._streamProgram != undefined) {
            this._streamProgram.use();
            this._streamProgram.P = this.pMatrix;
        }
    };
    return CylinderStreaming;
}(BaseScene_1.BaseScene));
exports.CylinderStreaming = CylinderStreaming;
//# sourceMappingURL=CylinderStreaming.js.map