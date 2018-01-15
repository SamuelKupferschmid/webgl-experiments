"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dynamics_1 = require("./Dynamics");
var Vec3_1 = require("./math/Vec3");
var Quaternion_1 = require("./math/Quaternion");
var GyroDynamics = /** @class */ (function () {
    function GyroDynamics(i1, i2, i3) {
        this._i1 = i1;
        this._i2 = i2;
        this._i3 = i3;
    }
    GyroDynamics.prototype.f = function (x) {
        var w1 = x[0], w2 = x[1], w3 = x[2];
        // quaternion (angle, x, y, z)
        var q0 = x[3], q1 = x[4], q2 = x[5], q3 = x[6];
        return [(this._i2 - this._i3) / this._i1 * w2 * w3,
            (this._i3 - this._i1) / this._i2 * w3 * w1,
            (this._i1 - this._i2) / this._i3 * w1 * w2,
            -0.5 * (q1 * w1 + q2 * w2 + q3 * w3),
            0.5 * (q0 * w1 + q2 * w3 - q3 * w2),
            0.5 * (q0 * w2 + q3 * w1 - q1 * w3),
            0.5 * (q0 * w3 + q1 * w2 - q2 * w1)];
    };
    Object.defineProperty(GyroDynamics.prototype, "state", {
        get: function () {
            return {
                w1: this._state[0],
                w2: this._state[1],
                w3: this._state[2],
                quaternion: new Quaternion_1.Quaternion(2 * Math.acos(this._state[3]) * 180 / Math.PI, this._state[4], this._state[5], this._state[6])
            };
        },
        set: function (state) {
            var q0 = Math.cos(0.5 * state.quaternion.q0 * Math.PI / 180);
            var n = new Vec3_1.Vec3(state.quaternion.q1, state.quaternion.q2, state.quaternion.q3);
            n = n.normalize();
            var s = Math.sin(0.5 * state.quaternion.q0 * Math.PI / 180);
            this._state = [state.w1, state.w2, state.w3, q0, s * n.x, s * n.y, s * n.z];
        },
        enumerable: true,
        configurable: true
    });
    GyroDynamics.prototype.move = function (dt) {
        var _this = this;
        this._state = Dynamics_1.Dynamics.runge(this._state, dt, function (v) { return _this.f(v); });
    };
    return GyroDynamics;
}());
exports.GyroDynamics = GyroDynamics;
var GyroDynamicsState = /** @class */ (function () {
    function GyroDynamicsState() {
    }
    return GyroDynamicsState;
}());
exports.GyroDynamicsState = GyroDynamicsState;
//# sourceMappingURL=GyroDynamics.js.map