import * as FragmentShader from '../shaders/main.frag';
import * as VertexShader from '../shaders/main.vert';

import {ShaderProgram} from "../ShaderProgram";
import {Mat4} from "../math/Mat4";

export abstract class BaseScene {
    private nextAnimFrame: number;
    private near = -10;
    private far = 1000;

    protected _context: WebGLRenderingContext;

    protected uColor: WebGLUniformLocation | any;
    protected _canvas: HTMLCanvasElement;

    protected vMatrix: Mat4;
    protected pMatrix: Mat4;

    constructor(canvas: HTMLCanvasElement) {
        this._context = BaseScene.create3DContext(canvas);
        this._canvas = canvas;

        this.onResize(canvas.width, canvas.height);

        window.addEventListener('resize', this.onResizeFramed,false);
    }

    public run(fpsCb: Function) {
        this.isRunning = true;
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
            this.nextAnimFrame = requestAnimationFrame(anim);
        };

        this.nextAnimFrame = requestAnimationFrame(anim);
    }

    public stop() {
        cancelAnimationFrame(this.nextAnimFrame);
        window.removeEventListener('resize',this.onResizeFramed)
    }

    protected abstract drawFrame(frame: number, msDuration: number);

    private onResizeFramed = () => {
        requestAnimationFrame(() => {
            this.onResize(this._canvas.width, this._canvas.height);
        });
    };

    protected onResize(width: number, height: number) {
        this._context.viewport(0, 0, width, height);

        let aspect = width / height;

        this.pMatrix = Mat4.perspective2(Math.PI / 3, aspect, 1, 1000);
        //this.pMatrix = Mat4.perspective(left, right, top, bottom, this.near, this.far);
    }

    private static create3DContext(canvas: HTMLCanvasElement) {
        let names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
        let context = null;
        for (let ii = 0; ii < names.length; ++ii) {
            try {
                context = canvas.getContext(names[ii]);
            } catch(e) {}
            if (context) {
                break;
            }
        }
        return context;
    }
}