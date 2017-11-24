import * as FragmentShader from '../shaders/main.frag';
import * as VertexShader from '../shaders/main.vert';

import {Mat4} from "../math/Mat4";
import {ShaderProgram} from "../ShaderProgram";

export abstract class BaseScene {
    protected _context: WebGLRenderingContext;
    private _world: ShaderProgram;

    protected uColor: WebGLUniformLocation | any;
    constructor(context: WebGLRenderingContext) {
        this._context = context;
        this._world = new ShaderProgram(context, VertexShader, FragmentShader);
        this._world.use();

        let triangleVertexPositionBuffer = this._context.createBuffer();

        let vertices = [
            0, 0, 0,
            1, 0, 0,
            0, 0, 0,
            0, 1, 0,
            0, 0, 0,
            0, 0, 1
        ];

        this._context.bindBuffer(this._context.ARRAY_BUFFER, triangleVertexPositionBuffer);
        this._context.bufferData(this._context.ARRAY_BUFFER, new Float32Array(vertices), this._context.STATIC_DRAW);
        this._context.vertexAttribPointer(this._world.aPosition, 3, this._context.FLOAT, false, 0, 0);

        this._context.bindBuffer(this._context.ARRAY_BUFFER, triangleVertexPositionBuffer);

        this._context.bufferData(this._context.ARRAY_BUFFER, new Float32Array(vertices), this._context.STATIC_DRAW);

        this._context.enableVertexAttribArray(this._world.aPosition);
    }

    public run(fpsCb : Function) {
        let frame = 0;
        let msStart = Date.now();
        let lastTick = 0;
        let anim = () => {
            let msDuration = Date.now() - msStart;

            if(frame % 20 == 0) {
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

    drawWorld() {
        let gl = this._context;
        this._world.use();

        gl.uniform4fv(this.uColor, [0.2, 1, 1, 1]);
        gl.drawArrays(gl.LINES, 0, 6);
    }
}