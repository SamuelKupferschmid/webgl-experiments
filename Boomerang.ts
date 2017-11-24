import * as FragmentShader from './shaders/main.frag';
import * as VertexShader from './shaders/main.vert';

import {Mat4} from "./math/Mat4";
import {BaseScene} from "./BaseScene";
import {VerticesUtils} from "./VerticesUtils";
import {MvpProgram} from "./MvpProgram";

export class Boomerang extends BaseScene {

    private _program: MvpProgram;
    private boomerang: Float32Array;

    constructor(context: WebGLRenderingContext) {
        super(context);
        this._program = new MvpProgram(context, VertexShader, FragmentShader);
        this._program.use();
        this.boomerang = new Float32Array(VerticesUtils.createCirlcePoints(8));

        let buffer = this._context.createBuffer();

        this._context.bindBuffer(this._context.ARRAY_BUFFER, buffer);
        this._context.bufferData(this._context.ARRAY_BUFFER, this.boomerang, this._context.STATIC_DRAW);
        this._context.vertexAttribPointer(this._program.aPosition, 3, this._context.FLOAT, false, 0, 0);

        this._context.enableVertexAttribArray(this._program.aPosition);
    }

    protected drawFrame(frame: number, msDuration: number) {
        let gl = this._context;

        gl.clearColor(0.0, 1.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

        this.drawWorld();

        this._program.use();
        gl.uniform4fv(this.uColor, [0.2, 1, 1, 1]);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, 6);
    }
}