import {Mat4} from "./math/Mat4";

export class ShaderProgram {
    private _context: WebGLRenderingContext;
    private _program: WebGLProgram;

    private uColor;
    private uProjection: WebGLUniformLocation;
    private uView: WebGLUniformLocation;
    private uModel: WebGLUniformLocation;
    public aPosition: number;

    constructor(context : WebGLRenderingContext, vShaderSource: string, fShaderSource: string) {

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

        let matrix = Mat4.ID;
        this.M = matrix;
        this.V = matrix;
        this.P = matrix;
    }

    public get program(): WebGLProgram {
        return this._program;
    }

    public use() {
        this._context.useProgram(this._program);
    }

    public set M(matrix: Mat4) {
        this._context.uniformMatrix4fv(this.uModel, false, matrix.toArray());
    }

    public set V(matrix: Mat4) {
        this._context.uniformMatrix4fv(this.uView, false, matrix.toArray());
    }

    public set P(matrix: Mat4) {
        this._context.uniformMatrix4fv(this.uProjection, false, matrix.toArray());
    }

    private setShader(source: string, program: WebGLProgram, type: number) {
        let shader = this._context.createShader(type);
        this._context.shaderSource(shader, source);
        this._context.compileShader(shader);

        if (!this._context.getShaderParameter(shader, this._context.COMPILE_STATUS)) {
            throw Error(this._context.getShaderInfoLog(shader));
        }

        this._context.attachShader(program,shader);

    }
}