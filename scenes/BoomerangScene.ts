import * as FragmentShader from '../shaders/main.frag';
import * as VertexShader from '../shaders/main.vert';
import * as BoomerangModel from '../models/boomerang.json';

import {BaseScene} from "./BaseScene";
import {VerticesUtils} from "../VerticesUtils";
import {ShaderProgram} from "../ShaderProgram";
import {Mat4} from "../math/Mat4";
import {Vec3} from "../math/Vec3";

export class BoomerangScene extends BaseScene {

    private _program: ShaderProgram;
    private boomerangVertices: Float32Array;

    private mMatrix = Mat4.ID;

    private roundtripDurationMs = 5000;
    private roundtripRadius = 2.1;
    private rotationDuration = 300;

    private a = new Vec3(0, 4, 0); // Camera Position
    private b = new Vec3(0, 0, 0); // Look At
    private up = new Vec3(0, 1, 1); // up

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this._program = new ShaderProgram(this._context, VertexShader, FragmentShader);
        this._program.use();
        this.boomerangVertices = new Float32Array(BoomerangModel.map(v => v * 0.04));

        let buffer = this._context.createBuffer();

        this._context.bindBuffer(this._context.ARRAY_BUFFER, buffer);
        this._context.bufferData(this._context.ARRAY_BUFFER, this.boomerangVertices, this._context.STATIC_DRAW);
        this._context.vertexAttribPointer(this._program.aPosition, 2, this._context.FLOAT, false, 0, 0);

        this._context.enableVertexAttribArray(this._program.aPosition);
        this.vMatrix = Mat4.lookAt(this.a, this.b, this.up);
        this._program.V = this.vMatrix;
        this._program.P = this.pMatrix;
    }

    protected drawFrame(frame: number, msDuration: number) {
        let gl = this._context;

        gl.clearColor(0.0, 1.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

        this._program.setColor(0.2, 1, 1, 1);

        let n = 10;

        let roundTripAngle = (msDuration / this.roundtripDurationMs) * 2 * Math.PI;
        let rotationAngle = (msDuration / this.rotationDuration) * 2 * Math.PI;

        for (let i = 0; i < n; i++) {

            let offsetAngle = 2 * Math.PI * i / n;

            this._program.M = this.mMatrix
                .rotate(-rotationAngle, 0, 0, 1)
                .rotate(-Math.PI / 3, 0, 1, 0)
                .translate(this.roundtripRadius, 0, 1)
                .rotate(roundTripAngle + offsetAngle, 0, 0, 1);

            gl.drawArrays(gl.TRIANGLE_FAN, 0, this.boomerangVertices.length / 2);

        }
    }

    onResize(width: number, height: number) {
        super.onResize(width, height);

        if (this._program != undefined)
            this._program.P = this.pMatrix;
    }
}