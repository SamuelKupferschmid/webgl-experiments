import {Dynamics} from './Dynamics';
import {Vec3} from './math/Vec3';
import {Quaternion} from './math/Quaternion';

export class GyroDynamics {
    private _i1: number;
    private _i2: number;
    private _i3: number;
    private _state: number[];

    constructor(i1: number, i2: number, i3: number) {
        this._i1 = i1;
        this._i2 = i2;
        this._i3 = i3;
    }

    private f(x: number[]): number[] {
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
        let q0 = Math.cos(0.5 * state.quaternion.q0 * Math.PI / 180);
        let n = new Vec3(state.quaternion.q1, state.quaternion.q2, state.quaternion.q3);
        n = n.normalize();
        let s = Math.sin(0.5 * state.quaternion.q0 * Math.PI / 180);
        this._state = [state.w1, state.w2, state.w3, q0, s * n.x, s * n.y, s * n.z];
    }

    get state(): GyroDynamicsState {
        return {
            w1: this._state[0],
            w2: this._state[1],
            w3: this._state[2],
            quaternion: new Quaternion(2 * Math.acos(this._state[3]) * 180 / Math.PI,
                this._state[4],
                this._state[5],
                this._state[6])
        };
    }

    move(dt: number) {
        this._state = Dynamics.runge(this._state, dt, v => this.f(v));
    }
}


export class GyroDynamicsState {
    w1: number;
    w2: number;
    w3: number;
    quaternion: Quaternion
}