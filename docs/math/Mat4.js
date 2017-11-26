"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vec3_1 = require("./Vec3");
var Mat4 = /** @class */ (function () {
    function Mat4(m00, m10, m20, m30, // Constructor
        m01, m11, m21, m31, m02, m12, m22, m32, m03, m13, m23, m33) {
        var _this = this;
        this.toArray = function () { return [_this.m00, _this.m10, _this.m20, _this.m30, _this.m01, _this.m11, _this.m21, _this.m31, _this.m02, _this.m12, _this.m22, _this.m32, _this.m03, _this.m13, _this.m23, _this.m33]; };
        this.scale = function (sx, sy, sz) { return Mat4.scale(sx, sy, sz).multiply(_this); };
        this.rotate = function (angle, x, y, z) { return Mat4.rotate(angle, x, y, z).multiply(_this); };
        this.translate = function (tx, ty, tz) { return Mat4.translate(tx, ty, tz).multiply(_this); };
        this.m00 = m00; // Matrix-Elements
        this.m10 = m10;
        this.m20 = m20;
        this.m30 = m30;
        this.m01 = m01;
        this.m11 = m11;
        this.m21 = m21;
        this.m31 = m31;
        this.m02 = m02;
        this.m12 = m12;
        this.m22 = m22;
        this.m32 = m32;
        this.m03 = m03;
        this.m13 = m13;
        this.m23 = m23;
        this.m33 = m33;
    }
    Mat4.fromArray = function (arr) {
        return new Mat4(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8], arr[9], arr[10], arr[11], arr[12], arr[13], arr[14], arr[15]);
    };
    Object.defineProperty(Mat4, "ZEROS", {
        get: function () {
            return new Mat4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mat4, "ID", {
        get: function () {
            return new Mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        },
        enumerable: true,
        configurable: true
    });
    Mat4.rotate = function (angle, x, y, z) {
        var len = Math.sqrt(x * x + y * y + z * z);
        if (len != 0 && len != 1) {
            len = 1.0 / len;
            x *= len;
            y *= len;
            z *= len;
        }
        var c = Math.cos(angle);
        var ic = 1.0 - c;
        var s = Math.sin(angle);
        var xy = x * y;
        var xz = x * z;
        var xs = x * s;
        var ys = y * s;
        var yz = y * z;
        var zs = z * s;
        var m00 = x * x * ic + c;
        var m10 = xy * ic + zs;
        var m20 = xz * ic - ys;
        var m01 = xy * ic - zs;
        var m11 = y * y * ic + c;
        var m21 = yz * ic + xs;
        var m02 = xz * ic + ys;
        var m12 = yz * ic - xs;
        var m22 = z * z * ic + c;
        return new Mat4(m00, m10, m20, 0, m01, m11, m21, 0, m02, m12, m22, 0, 0, 0, 0, 1);
    };
    ;
    Mat4.lookAt = function (position, target, up) {
        up = up.normalize();
        var f = target.subtract(position).normalize();
        var s = f.cross(up).normalize();
        var u = s.cross(f);
        var t = position.negate();
        var m00 = s.x;
        var m10 = u.x;
        var m20 = -f.x;
        var m01 = s.y;
        var m11 = u.y;
        var m21 = -f.y;
        var m02 = s.z;
        var m12 = u.z;
        var m22 = -f.z;
        var m03 = s.x * t.x + s.y * t.y + s.z * t.z;
        var m13 = u.x * t.x + u.y * t.y + u.z * t.z;
        var m23 = -f.x * t.x - f.y * t.y - f.z * t.z;
        var m33 = 1;
        return new Mat4(m00, m10, m20, 0, m01, m11, m21, 0, m02, m12, m22, 0, m03, m13, m23, m33);
    };
    ;
    Mat4.perspective = function (left, right, bottom, top, near, far) {
        var m00 = 2 * near / (right - left);
        var m11 = 2 * near / (top - bottom);
        var m02 = (right + left) / (right - left);
        var m12 = (top + bottom) / (top - bottom);
        var m22 = -(far + near) / (far - near);
        var m32 = -1;
        var m23 = -2 * far * near / (far - near);
        return new Mat4(m00, 0, 0, 0, 0, m11, 0, 0, m02, m12, m22, m32, 0, 0, m23, 0);
    };
    Mat4.perspective2 = function (fieldOfViewInRadians, aspect, near, far) {
        var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
        var rangeInv = 1.0 / (near - far);
        return new Mat4(f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (near + far) * rangeInv, -1, 0, 0, near * far * rangeInv * 2, 0);
    };
    Mat4.ortho = function (left, right, bottom, top, near, far) {
        var dx = right - left;
        var dy = top - bottom;
        var dz = far - near;
        var tx = -(right + left) / dx;
        var ty = -(top + bottom) / dy;
        var tz = -(far + near) / dz;
        var m00 = 2.0 / dx;
        var m11 = 2.0 / dy;
        var m22 = -2.0 / dz;
        var m03 = tx;
        var m13 = ty;
        var m23 = tz;
        var m33 = 1;
        return new Mat4(m00, 0, 0, 0, 0, m11, 0, 0, 0, 0, m22, 0, m03, m13, m23, m33);
    };
    /*transform(vec) {
        let x = this.m00 * vec.x + this.m01 * vec.y + this.m02 * vec.z + this.m03 * vec.w;
        let y = this.m10 * vec.x + this.m11 * vec.y + this.m12 * vec.z + this.m13 * vec.w;
        let z = this.m20 * vec.x + this.m21 * vec.y + this.m22 * vec.z + this.m23 * vec.w;
        let w = this.m30 * vec.x + this.m31 * vec.y + this.m32 * vec.z + this.m33 * vec.w;
        return new Vec4(x, y, z, w);
    }*/
    Mat4.prototype.multiply = function (mat) {
        var m00 = this.m00 * mat.m00 + this.m01 * mat.m10 + this.m02 * mat.m20 + this.m03 * mat.m30;
        var m10 = this.m10 * mat.m00 + this.m11 * mat.m10 + this.m12 * mat.m20 + this.m13 * mat.m30;
        var m20 = this.m20 * mat.m00 + this.m21 * mat.m10 + this.m22 * mat.m20 + this.m23 * mat.m30;
        var m30 = this.m30 * mat.m00 + this.m31 * mat.m10 + this.m32 * mat.m20 + this.m33 * mat.m30;
        var m01 = this.m00 * mat.m01 + this.m01 * mat.m11 + this.m02 * mat.m21 + this.m03 * mat.m31;
        var m11 = this.m10 * mat.m01 + this.m11 * mat.m11 + this.m12 * mat.m21 + this.m13 * mat.m31;
        var m21 = this.m20 * mat.m01 + this.m21 * mat.m11 + this.m22 * mat.m21 + this.m23 * mat.m31;
        var m31 = this.m30 * mat.m01 + this.m31 * mat.m11 + this.m32 * mat.m21 + this.m33 * mat.m31;
        var m02 = this.m00 * mat.m02 + this.m01 * mat.m12 + this.m02 * mat.m22 + this.m03 * mat.m32;
        var m12 = this.m10 * mat.m02 + this.m11 * mat.m12 + this.m12 * mat.m22 + this.m13 * mat.m32;
        var m22 = this.m20 * mat.m02 + this.m21 * mat.m12 + this.m22 * mat.m22 + this.m23 * mat.m32;
        var m32 = this.m30 * mat.m02 + this.m31 * mat.m12 + this.m32 * mat.m22 + this.m33 * mat.m32;
        var m03 = this.m00 * mat.m03 + this.m01 * mat.m13 + this.m02 * mat.m23 + this.m03 * mat.m33;
        var m13 = this.m10 * mat.m03 + this.m11 * mat.m13 + this.m12 * mat.m23 + this.m13 * mat.m33;
        var m23 = this.m20 * mat.m03 + this.m21 * mat.m13 + this.m22 * mat.m23 + this.m23 * mat.m33;
        var m33 = this.m30 * mat.m03 + this.m31 * mat.m13 + this.m32 * mat.m23 + this.m33 * mat.m33;
        return new Mat4(m00, m10, m20, m30, m01, m11, m21, m31, m02, m12, m22, m32, m03, m13, m23, m33);
    };
    Mat4.prototype.transform3 = function (vec) {
        var vecw = 1;
        var x = this.m00 * vec.x + this.m01 * vec.y + this.m02 * vec.z + this.m03 * vecw;
        var y = this.m10 * vec.x + this.m11 * vec.y + this.m12 * vec.z + this.m13 * vecw;
        var z = this.m20 * vec.x + this.m21 * vec.y + this.m22 * vec.z + this.m23 * vecw;
        var w = this.m30 * vec.x + this.m31 * vec.y + this.m32 * vec.z + this.m33 * vecw;
        return new Vec3_1.Vec3(x, y, z);
    };
    Mat4.prototype.transpose = function () {
        return new Mat4(this.m00, this.m01, this.m02, this.m03, this.m10, this.m11, this.m12, this.m13, this.m20, this.m21, this.m22, this.m23, this.m30, this.m31, this.m32, this.m33);
    };
    Mat4.prototype.determinant = function () {
        return this.m30 * this.m21 * this.m12 * this.m03 - this.m20 * this.m31 * this.m12 * this.m03 - this.m30 * this.m11 * this.m22 * this.m03
            + this.m10 * this.m31 * this.m22 * this.m03 + this.m20 * this.m11 * this.m32 * this.m03 - this.m10 * this.m21 * this.m32 * this.m03
            - this.m30 * this.m21 * this.m02 * this.m13 + this.m20 * this.m31 * this.m02 * this.m13 + this.m30 * this.m01 * this.m22 * this.m13
            - this.m00 * this.m31 * this.m22 * this.m13 - this.m20 * this.m01 * this.m32 * this.m13 + this.m00 * this.m21 * this.m32 * this.m13
            + this.m30 * this.m11 * this.m02 * this.m23 - this.m10 * this.m31 * this.m02 * this.m23 - this.m30 * this.m01 * this.m12 * this.m23
            + this.m00 * this.m31 * this.m12 * this.m23 + this.m10 * this.m01 * this.m32 * this.m23 - this.m00 * this.m11 * this.m32 * this.m23
            - this.m20 * this.m11 * this.m02 * this.m33 + this.m10 * this.m21 * this.m02 * this.m33 + this.m20 * this.m01 * this.m12 * this.m33
            - this.m00 * this.m21 * this.m12 * this.m33 - this.m10 * this.m01 * this.m22 * this.m33 + this.m00 * this.m11 * this.m22 * this.m33;
    };
    Mat4.prototype.inverse = function () {
        var d = this.determinant();
        if (d == 0)
            return undefined;
        var v00 = (this.m12 * this.m23 * this.m31 - this.m13 * this.m22 * this.m31 + this.m13 * this.m21 * this.m32 - this.m11 * this.m23 * this.m32 - this.m12 * this.m21 * this.m33 + this.m11 * this.m22 * this.m33) / d;
        var v01 = (this.m03 * this.m22 * this.m31 - this.m02 * this.m23 * this.m31 - this.m03 * this.m21 * this.m32 + this.m01 * this.m23 * this.m32 + this.m02 * this.m21 * this.m33 - this.m01 * this.m22 * this.m33) / d;
        var v02 = (this.m02 * this.m13 * this.m31 - this.m03 * this.m12 * this.m31 + this.m03 * this.m11 * this.m32 - this.m01 * this.m13 * this.m32 - this.m02 * this.m11 * this.m33 + this.m01 * this.m12 * this.m33) / d;
        var v03 = (this.m03 * this.m12 * this.m21 - this.m02 * this.m13 * this.m21 - this.m03 * this.m11 * this.m22 + this.m01 * this.m13 * this.m22 + this.m02 * this.m11 * this.m23 - this.m01 * this.m12 * this.m23) / d;
        var v10 = (this.m13 * this.m22 * this.m30 - this.m12 * this.m23 * this.m30 - this.m13 * this.m20 * this.m32 + this.m10 * this.m23 * this.m32 + this.m12 * this.m20 * this.m33 - this.m10 * this.m22 * this.m33) / d;
        var v11 = (this.m02 * this.m23 * this.m30 - this.m03 * this.m22 * this.m30 + this.m03 * this.m20 * this.m32 - this.m00 * this.m23 * this.m32 - this.m02 * this.m20 * this.m33 + this.m00 * this.m22 * this.m33) / d;
        var v12 = (this.m03 * this.m12 * this.m30 - this.m02 * this.m13 * this.m30 - this.m03 * this.m10 * this.m32 + this.m00 * this.m13 * this.m32 + this.m02 * this.m10 * this.m33 - this.m00 * this.m12 * this.m33) / d;
        var v13 = (this.m02 * this.m13 * this.m20 - this.m03 * this.m12 * this.m20 + this.m03 * this.m10 * this.m22 - this.m00 * this.m13 * this.m22 - this.m02 * this.m10 * this.m23 + this.m00 * this.m12 * this.m23) / d;
        var v20 = (this.m11 * this.m23 * this.m30 - this.m13 * this.m21 * this.m30 + this.m13 * this.m20 * this.m31 - this.m10 * this.m23 * this.m31 - this.m11 * this.m20 * this.m33 + this.m10 * this.m21 * this.m33) / d;
        var v21 = (this.m03 * this.m21 * this.m30 - this.m01 * this.m23 * this.m30 - this.m03 * this.m20 * this.m31 + this.m00 * this.m23 * this.m31 + this.m01 * this.m20 * this.m33 - this.m00 * this.m21 * this.m33) / d;
        var v22 = (this.m01 * this.m13 * this.m30 - this.m03 * this.m11 * this.m30 + this.m03 * this.m10 * this.m31 - this.m00 * this.m13 * this.m31 - this.m01 * this.m10 * this.m33 + this.m00 * this.m11 * this.m33) / d;
        var v23 = (this.m03 * this.m11 * this.m20 - this.m01 * this.m13 * this.m20 - this.m03 * this.m10 * this.m21 + this.m00 * this.m13 * this.m21 + this.m01 * this.m10 * this.m23 - this.m00 * this.m11 * this.m23) / d;
        var v30 = (this.m12 * this.m21 * this.m30 - this.m11 * this.m22 * this.m30 - this.m12 * this.m20 * this.m31 + this.m10 * this.m22 * this.m31 + this.m11 * this.m20 * this.m32 - this.m10 * this.m21 * this.m32) / d;
        var v31 = (this.m01 * this.m22 * this.m30 - this.m02 * this.m21 * this.m30 + this.m02 * this.m20 * this.m31 - this.m00 * this.m22 * this.m31 - this.m01 * this.m20 * this.m32 + this.m00 * this.m21 * this.m32) / d;
        var v32 = (this.m02 * this.m11 * this.m30 - this.m01 * this.m12 * this.m30 - this.m02 * this.m10 * this.m31 + this.m00 * this.m12 * this.m31 + this.m01 * this.m10 * this.m32 - this.m00 * this.m11 * this.m32) / d;
        var v33 = (this.m01 * this.m12 * this.m20 - this.m02 * this.m11 * this.m20 + this.m02 * this.m10 * this.m21 - this.m00 * this.m12 * this.m21 - this.m01 * this.m10 * this.m22 + this.m00 * this.m11 * this.m22) / d;
        return new Mat4(v00, v10, v20, v30, v01, v11, v21, v31, v02, v12, v22, v32, v03, v13, v23, v33);
    };
    Mat4.scale = function (sx, sy, sz) { return new Mat4(sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1); };
    Mat4.translate = function (tx, ty, tz) { return new Mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1); };
    return Mat4;
}());
exports.Mat4 = Mat4;
//# sourceMappingURL=Mat4.js.map