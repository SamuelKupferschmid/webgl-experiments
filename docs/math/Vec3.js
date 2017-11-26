"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vec3 = /** @class */ (function () {
    function Vec3(x, y, z) {
        var _this = this;
        this.length = function () { return Math.sqrt(Math.pow(_this._x, 2) + Math.pow(_this._y, 2) + Math.pow(_this._z, 2)); };
        this.subtract = function (v) { return new Vec3(_this.x - v.x, _this.y - v.y, _this.z - v.z); };
        this.distance = function (vec) { return _this.subtract(vec).length; };
        this.add = function (vec) { return new Vec3(_this.x + vec.x, _this.y + vec.y, _this.z + vec.z); };
        this.toArray = function () { return [_this.x, _this.y, _this.z]; };
        this._x = x;
        this._y = y;
        this._z = z;
    }
    Object.defineProperty(Vec3, "ZERO", {
        get: function () {
            return new Vec3(0, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Vec3.ONE = function () {
        return new Vec3(1, 1, 1);
    };
    Vec3.X = function () {
        return new Vec3(1, 0, 0);
    };
    Vec3.Y = function () {
        return new Vec3(0, 1, 0);
    };
    Vec3.Z = function () {
        return new Vec3(0, 0, 1);
    };
    Vec3.X_NEG = function () {
        return new Vec3(-1, 0, 0);
    };
    Vec3.Y_NEG = function () {
        return new Vec3(0, -1, 0);
    };
    Vec3.Z_NEG = function () {
        return new Vec3(0, 0, -1);
    };
    Object.defineProperty(Vec3.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec3.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vec3.prototype, "z", {
        get: function () {
            return this._z;
        },
        enumerable: true,
        configurable: true
    });
    Vec3.prototype.scale = function (s) {
        return new Vec3(this.x * s, this.y * s, this.z * s);
    };
    Vec3.prototype.negate = function () {
        return this.scale(-1);
    };
    Vec3.prototype.normalize = function () {
        var l = this.length();
        if (l == 1)
            return this;
        return new Vec3(this.x / l, this.y / l, this.z / l);
    };
    Vec3.prototype.cross = function (a) {
        return new Vec3(this.y * a.z - this.z * a.y, this.z * a.x - this.x * a.z, this.x * a.y - this.y * a.x);
    };
    return Vec3;
}());
exports.Vec3 = Vec3;
//# sourceMappingURL=Vec3.js.map