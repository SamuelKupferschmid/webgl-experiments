import {Dynamics} from './Dynamics';
import {Vec3} from './math/Vec3';

export class GyroDynamics {
    private _i1: number;
    private _i2: number;
    private _i3: number;
    private _x: number[];

    constructor(i1: number, i2: number, i3: number) {
        this._i1 = i1;
        this._i2 = i2;
        this._i3 = i3;
    }

    private f(x: number[]) : number[] {
        let w1 = x[0], w2 = x[1], w3 = x[2];

        // quaternion (angle, x, y, z)
        let q0 = x[3], q1 = x[4], q2 = x[5], q3 = x[6];
        return [(this._i2 - this._i3) / this._i1 * w2 * w3,
            (this._i3 - this._i1) / this._i2 * w3 * w1,
            (this._i1 - this._i2) / this._i3 * w1 * w2,
            -0.5 * (q1 * w1 + q2 * w2 + q3 * w3),
            0.5 * (q0 * w1 + q2 * w3 - q3 * w2),
            0.5 * (q0 * w2 + q3 * w1 - q1 * w3),
            0.5 * (q0 * w3 + q1 * w2 - q2 * w1)];
    }

    set state(state: GyroDynamicsState) {
        let q0 = Math.cos(0.5 * state.phi * Math.PI / 180);
        let n = new Vec3(state.x, state.y, state.z);
        n = n.normalize();
        let s = Math.sin(0.5 * state.phi * Math.PI / 180);
        this._x = [state.w1, state.w2, state.w3, q0, s * n.x, s * n.y, s * n.z];
    }

    get state(): GyroDynamicsState {
        return {
            w1: this._x[0],
            w2: this._x[1],
            w3: this._x[2],
            phi: 2 * Math.acos(this._x[3]) * 180 / Math.PI,
            x: this._x[4],
            y: this._x[5],
            z: this._x[6]
        }
    }

    move(dt: number) {
        this._x = Dynamics.runge(this._x, dt, v => this.f(v));
    }
}


export class GyroDynamicsState {
    w1: number;
    w2: number;
    w3: number;
    phi: number;
    x: number;
    y: number;
    z: number;
}