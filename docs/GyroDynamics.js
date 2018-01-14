"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dynamics_1 = require("./Dynamics");
var Vec3_1 = require("./math/Vec3");
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
                w1: this._x[0],
                w2: this._x[1],
                w3: this._x[2],
                phi: 2 * Math.acos(this._x[3]) * 180 / Math.PI,
                x: this._x[4],
                y: this._x[5],
                z: this._x[6]
            };
        },
        set: function (state) {
            var q0 = Math.cos(0.5 * state.phi * Math.PI / 180);
            var n = new Vec3_1.Vec3(state.x, state.y, state.z);
            n = n.normalize();
            var s = Math.sin(0.5 * state.phi * Math.PI / 180);
            this._x = [state.w1, state.w2, state.w3, q0, s * n.x, s * n.y, s * n.z];
        },
        enumerable: true,
        configurable: true
    });
    GyroDynamics.prototype.move = function (dt) {
        var _this = this;
        this._x = Dynamics_1.Dynamics.runge(this._x, dt, function (v) { return _this.f(v); });
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