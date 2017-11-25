import {BaseScene} from "./BaseScene";
import {VerticesUtils} from "../VerticesUtils";
import {ShaderProgram} from "../ShaderProgram";
import {Vec3} from "../math/Vec3";
import {Mat4} from "../math/Mat4";

export class CylinderStreaming extends BaseScene {
    private _zylinder: Float32Array;
    private _program: ShaderProgram;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        this._zylinder = new Float32Array(VerticesUtils.createCirlcePoints(8));
        this._program = new ShaderProgram(this._context, ShaderProgram.DEFAULT_VSHADER, ShaderProgram.DEFAULT_FSHADER);

        let buffer = this._context.createBuffer();

        this._context.bindBuffer(this._context.ARRAY_BUFFER, buffer);
        this._context.bufferData(this._context.ARRAY_BUFFER, this._zylinder, this._context.STATIC_DRAW);
        this._context.vertexAttribPointer(this._program.aPosition, 2, this._context.FLOAT, false, 0, 0);

        this._context.enableVertexAttribArray(this._program.aPosition);

        this.vMatrix = Mat4.ID;//.lookAt(this.a, this.b, this.up);
        this.pMatrix = Mat4.ID;
        this._program.V = this.vMatrix;
        this._program.P = this.pMatrix;
        this._program.M = Mat4.ID;
    }

    protected drawFrame(frame: number, msDuration: number){
        let gl = this._context;

        gl.clearColor(0.0, 1.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

        this._program.setColor(0.2, 1, 1, 1);
        this._context.drawArrays(this._context.TRIANGLE_FAN,0, this._zylinder.length / 2);
    }

    onResize(width: number, height: number) {
        this._context.viewport(0, 0, width, height);

        this.pMatrix = Mat4.ortho(-1,1,-1,1,-60,1000);
        if (this._program != undefined)
            this._program.P = this.pMatrix;
    }
}