import * as FragmentShader from '../shaders/main.frag';
import * as VertexShader from '../shaders/main.vert';
import {BaseScene} from './BaseScene';
import {ShaderProgram} from '../ShaderProgram';
import {Mat4} from '../math/Mat4';
import {Vec3} from '../math/Vec3';
import {GyroDynamics} from '../GyroDynamics';
import {ShapeBuilder} from '../ShapeBuilder';

export class FlyingCuboidsScene extends BaseScene {

    private _program: ShaderProgram;
    private mMatrix = Mat4.ID;

    private a = new Vec3(1, 10, 1); // Camera Position
    private b = new Vec3(0, 0, 2); // Look At
    private up = new Vec3(0, 1, 1); // up

    private t = 0;
    private dt = 0.000005;

    private x = 0;
    private dx = 0.10;

    private dim = [1, 1, 1];

    private translate = true;
    private rotate = true;


    private gyro = new GyroDynamics(0.2, 0.2, 0.2);

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);

        this._program = new ShaderProgram(this._context, VertexShader, FragmentShader);
        this._program.use();

        let buffer = this._context.createBuffer();

        this._context.bindBuffer(this._context.ARRAY_BUFFER, buffer);
        this._context.bufferData(this._context.ARRAY_BUFFER, new Float32Array(ShapeBuilder.GetCuboid()), this._context.STATIC_DRAW);
        this._context.vertexAttribPointer(this._program.aPosition, 3, this._context.FLOAT, false, 0, 0);

        this._context.enableVertexAttribArray(this._program.aPosition);
        this.vMatrix = Mat4.lookAt(this.a, this.b, this.up);
        this._program.V = this.vMatrix;
        this._program.P = this.pMatrix;

        this.resetMovement([1, 1, 1]);

        window.addEventListener('keypress', ev => this.keypress(ev));
    }


    protected drawFrame(frame: number, msDuration: number) {
        let gl = this._context;

        gl.clearColor(0.0, 1.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

        this._program.setColor(1, 0, 0, 1);

        let state = this.gyro.state;

        this.gyro.move(this.t);

        if (this.translate) {
            this.x += this.dx;
        }

        if (this.rotate) {
            this.t += this.dt;
        }

        let m = Mat4.ID
            .multiply(Mat4.scale(this.dim[0], this.dim[1], this.dim[2]))
            .multiply(Mat4.translate(this.x, 0, 0))
            .multiply(Mat4.rotate(state.phi, state.x, state.y, state.z));

        this._program.M = m;

        gl.drawArrays(gl.TRIANGLES, 0, 36);
    }

    private keypress(ev: KeyboardEvent) {
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
    }

    private resetMovement(dimensions: number[]) {
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
    }
}