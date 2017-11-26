"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FragmentShader = require("../shaders/main.frag");
var VertexShader = require("../shaders/main.vert");
var Mat4_1 = require("./math/Mat4");
var ShaderProgram = /** @class */ (function () {
    function ShaderProgram(context, vShaderSource, fShaderSource) {
        this._context = context;
        this._program = this._context.createProgram();
        this.setShader(vShaderSource, this._program, this._context.VERTEX_SHADER);
        this.setShader(fShaderSource, this._program, this._context.FRAGMENT_SHADER);
        this._context.linkProgram(this._program);
        this.use();
        this.uColor = this._context.getUniformLocation(this._program, 'uColor');
        this.aPosition = this._context.getAttribLocation(this._program, 'aPosition');
        this.uProjection = this._context.getUniformLocation(this._program, 'uProjection');
        this.uView = this._context.getUniformLocation(this._program, 'uView');
        this.uModel = this._context.getUniformLocation(this._program, 'uModel');
        var matrix = Mat4_1.Mat4.ID;
        this.M = matrix;
        this.V = matrix;
        this.P = matrix;
    }
    Object.defineProperty(ShaderProgram.prototype, "program", {
        get: function () {
            return this._program;
        },
        enumerable: true,
        configurable: true
    });
    ShaderProgram.prototype.use = function () {
        this._context.useProgram(this._program);
    };
    Object.defineProperty(ShaderProgram.prototype, "M", {
        set: function (matrix) {
            this._context.uniformMatrix4fv(this.uModel, false, matrix.toArray());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderProgram.prototype, "V", {
        set: function (matrix) {
            this._context.uniformMatrix4fv(this.uView, false, matrix.toArray());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderProgram.prototype, "P", {
        set: function (matrix) {
            this._context.uniformMatrix4fv(this.uProjection, false, matrix.toArray());
        },
        enumerable: true,
        configurable: true
    });
    ShaderProgram.prototype.setColor = function (r, g, b, a) {
        this._context.uniform4fv(this.uColor, [r, g, b, a]);
    };
    ShaderProgram.prototype.setShader = function (source, program, type) {
        var shader = this._context.createShader(type);
        this._context.shaderSource(shader, source);
        this._context.compileShader(shader);
        if (!this._context.getShaderParameter(shader, this._context.COMPILE_STATUS)) {
            throw Error(this._context.getShaderInfoLog(shader));
        }
        this._context.attachShader(program, shader);
    };
    Object.defineProperty(ShaderProgram, "DEFAULT_VSHADER", {
        get: function () {
            return VertexShader;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShaderProgram, "DEFAULT_FSHADER", {
        get: function () {
            return FragmentShader;
        },
        enumerable: true,
        configurable: true
    });
    return ShaderProgram;
}());
exports.ShaderProgram = ShaderProgram;
//# sourceMappingURL=ShaderProgram.js.map