"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Quaternion = /** @class */ (function () {
    function Quaternion(q0, q1, q2, q3) {
        this._q = [q0, q1, q2, q3];
    }
    Object.defineProperty(Quaternion.prototype, "q0", {
        get: function () {
            return this._q[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "q1", {
        get: function () {
            return this._q[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "q2", {
        get: function () {
            return this._q[2];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Quaternion.prototype, "q3", {
        get: function () {
            return this._q[3];
        },
        enumerable: true,
        configurable: true
    });
    return Quaternion;
}());
exports.Quaternion = Quaternion;
//# sourceMappingURL=Quaternion.js.map