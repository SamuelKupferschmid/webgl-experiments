import {BaseScene} from "./BaseScene";
import {VerticesUtils} from "../VerticesUtils";
import {ShaderProgram} from "../ShaderProgram";
import {Vec3} from "../math/Vec3";
import {Mat4} from "../math/Mat4";
import {Dynamics} from "../Dynamics";

export class CylinderStreaming extends BaseScene {
    private _cylinder: Float32Array;
    private _cylinderProgram: ShaderProgram;
    private _streamProgram: ShaderProgram;

    private viewWidth: number;
    private viewHeight: number;
    private streamBuffer: WebGLBuffer;
    private mousePos = [0,0];

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        this._cylinder = new Float32Array(VerticesUtils.createCirlcePoints(32));
        this._cylinderProgram = new ShaderProgram(this._context, ShaderProgram.DEFAULT_VSHADER, ShaderProgram.DEFAULT_FSHADER);

        this._cylinderProgram.use();
        let buffer = this._context.createBuffer();

        this._context.bindBuffer(this._context.ARRAY_BUFFER, buffer);
        this._context.bufferData(this._context.ARRAY_BUFFER, this._cylinder, this._context.STATIC_DRAW);
        this._context.vertexAttribPointer(this._cylinderProgram.aPosition, 2, this._context.FLOAT, false, 0, 0);

        this._context.enableVertexAttribArray(this._cylinderProgram.aPosition);

        this.vMatrix = Mat4.ID;//.lookAt(this.a, this.b, this.up);
        this._cylinderProgram.V = this.vMatrix;
        this._cylinderProgram.P = this.pMatrix;
        this._cylinderProgram.M = Mat4.ID;

        this._streamProgram = new ShaderProgram(this._context, ShaderProgram.DEFAULT_VSHADER, ShaderProgram.DEFAULT_FSHADER);
        this._streamProgram.use();

        this.streamBuffer = this._context.createBuffer();

        this._context.bindBuffer(this._context.ARRAY_BUFFER, this.streamBuffer);
        this._context.bufferData(this._context.ARRAY_BUFFER, new Float32Array(20), this._context.DYNAMIC_DRAW);

        this._context.vertexAttribPointer(this._streamProgram.aPosition, 2, this._context.FLOAT, false, 0, 0);
        this._context.enableVertexAttribArray(this._streamProgram.aPosition);

        this._streamProgram.V = this.vMatrix;
        this._streamProgram.P = this.pMatrix;
        this._streamProgram.M = Mat4.ID;

    }

    protected drawFrame(frame: number, msDuration: number) {
        let gl = this._context;

        let position = this.mousePos;


        gl.clearColor(0.0, 1.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        this._cylinderProgram.use();
        this._cylinderProgram.setColor(0.2, 0.2, 1, 1);
        this._context.bufferData(this._context.ARRAY_BUFFER, this._cylinder, this._context.DYNAMIC_DRAW);
        this._context.drawArrays(this._context.TRIANGLE_FAN, 0, this._cylinder.length / 2);

        this._streamProgram.use();
        this._streamProgram.setColor(0, 0, 1, 1);

        let l = -2 * this.viewWidth;
        let r = -l;
        let top = this.viewHeight;
        let bottom = -top;

        let yCount = 50;
        let yStep = (top - bottom) / yCount;

        for (let y = top + yStep * 0.5; y >= bottom; y -= yStep) {
            let n = this.createStreamingLineVertices([l, y], [l, r, top, bottom]);
            this._context.bufferData(this._context.ARRAY_BUFFER, n, this._context.DYNAMIC_DRAW);
            this._context.drawArrays(this._context.LINE_STRIP, 0, n.length / 2);
        }

    }

    private streamline(x: number[]): number[] {
        let radius = 1;
        let radiusSquare = Math.pow(radius, 2);
        let xSquare = Math.pow(x[0], 2);
        let ySquare = Math.pow(x[1], 2);

        return [
            1 + radiusSquare / (xSquare + ySquare)
            - (2 * radiusSquare * xSquare) / Math.pow(xSquare + ySquare, 2),

            -(2 * radiusSquare * x[0] * x[1]) / Math.pow(xSquare + ySquare, 2)
        ]
    }

    private createStreamingLineVertices(start: number[], bounderies: number[]): Float32Array {
        let dt = 0.05;

        let [left, right, top, bottom] = [...bounderies];

        let [x,y] = [...start];

        let vertices = [];

        do {
            [x,y] = [...Dynamics.runge([x,y], dt, this.streamline)];
            vertices.push(x);
            vertices.push(y);
        } while (x > left && x < right && y < top && y > bottom);

        return new Float32Array(vertices);
    }

    onResize(width: number, height: number) {
        this._context.viewport(0, 0, width, height);
        this.viewHeight = 10;
        this.viewWidth = this.viewHeight * width / height;

        this.pMatrix = Mat4.ortho(-this.viewWidth / 2, this.viewWidth / 2, -this.viewHeight / 2, this.viewHeight / 2, -60, 1000);

        if (this._cylinderProgram != undefined) {
            this._cylinderProgram.use();
            this._cylinderProgram.P = this.pMatrix;
        }

        if (this._streamProgram != undefined) {
            this._streamProgram.use();
            this._streamProgram.P = this.pMatrix;
        }
    }
}