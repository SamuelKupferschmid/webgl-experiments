import {Mat4} from './Mat4';

export class Quaternion {
    private _q: number[];

    constructor(q0: number, q1: number, q2: number, q3: number) {
        this._q = [q0, q1, q2, q3];
    }

    get q0(): number {
        return this._q[0];
    }

    get q1(): number {
        return this._q[1];
    }

    get q2(): number {
        return this._q[2];
    }

    get q3(): number {
        return this._q[3];
    }
}
