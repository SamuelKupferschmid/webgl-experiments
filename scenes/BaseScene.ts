import * as FragmentShader from '../shaders/main.frag';
import * as VertexShader from '../shaders/main.vert';

import {ShaderProgram} from "../ShaderProgram";
import {Mat4} from "../math/Mat4";

export abstract class BaseScene {

    private near = -10;
    private far = 1000;

    protected _context: WebGLRenderingContext;
    private _world: ShaderProgram;

    protected uColor: WebGLUniformLocation | any;
    protected _canvas: HTMLCanvasElement;

    protected vMatrix: Mat4;
    protected pMatrix: Mat4;

    constructor(canvas: HTMLCanvasElement) {
        this._context = canvas.getContext("webgl");
        this._canvas = canvas;

        this.onResize(canvas.width, canvas.height);

        canvas.addEventListener('resize', () => {
            requestAnimationFrame(() => {
                this.onResize(canvas.width, canvas.height);
            });
        }, false);
    }

    public run(fpsCb: Function) {
        let frame = 0;
        let msStart = Date.now();
        let lastTick = 0;
        let anim = () => {
            let msDuration = Date.now() - msStart;

            if (frame % 20 == 0) {
                let fps = 1000 / (msDuration - lastTick);
                fpsCb(fps);
            }

            this.drawFrame(frame++, msDuration);

            lastTick = msDuration;
            requestAnimationFrame(anim);
        };

        requestAnimationFrame(anim);
    }

    protected abstract drawFrame(frame: number, msDuration: number);

    protected onResize(width: number, height: number) {
        this._context.viewport(0, 0, width, height);

        let aspect = width / height;

        this.pMatrix = Mat4.perspective2(Math.PI / 3, aspect, 1 , 1000);
        //this.pMatrix = Mat4.perspective(left, right, top, bottom, this.near, this.far);
    }

    drawWorld() {
    }
}