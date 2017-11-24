export class Mat4 {
    private m00: number;
    private m10: number;
    private m20: number;
    private m30: number;
    private m01: number;
    private m11: number;
    private m21: number;
    private m31: number;
    private m02: number;
    private m12: number;
    private m22: number;
    private m32: number;
    private m03: number;
    private m13: number;
    private m23: number;
    private m33: number;

    constructor(m00: number, m10: number, m20: number, m30: number,           // Constructor
                m01: number, m11: number, m21: number, m31: number,
                m02: number, m12: number, m22: number, m32: number,
                m03: number, m13: number, m23: number, m33: number) {
        this.m00 = m00;                           // Matrix-Elements
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

    public static fromArray(arr: number[]) {

        return new Mat4(arr[0], arr[1], arr[2], arr[3],
            arr[4], arr[5], arr[6], arr[7],
            arr[8], arr[9], arr[10], arr[11],
            arr[12], arr[13], arr[14], arr[15]);
    }

    toArray = () => [this.m00, this.m10, this.m20, this.m30, this.m01, this.m11, this.m21, this.m31, this.m02, this.m12, this.m22, this.m32, this.m03, this.m13, this.m23, this.m33];

    public static get ZEROS() {
        return new Mat4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }

    public static get ID() {
        return new Mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    }

    public static scale = (sx, sy, sz) => new Mat4(sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1);

    public static translate = (tx, ty, tz) => new Mat4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, tx, ty, tz, 1);

    public static rotate(angle, x, y, z)          // Create rotation matrix
    {
        let len = Math.sqrt(x * x + y * y + z * z);
        if (len != 0 && len != 1) {
            len = 1.0 / len;
            x *= len;
            y *= len;
            z *= len;
        }
        let c = Math.cos(angle);
        let ic = 1.0 - c;
        let s = Math.sin(angle);
        let xy = x * y;
        let xz = x * z;
        let xs = x * s;
        let ys = y * s;
        let yz = y * z;
        let zs = z * s;
        let m00 = x * x * ic + c;
        let m10 = xy * ic + zs;
        let m20 = xz * ic - ys;
        let m01 = xy * ic - zs;
        let m11 = y * y * ic + c;
        let m21 = yz * ic + xs;
        let m02 = xz * ic + ys;
        let m12 = yz * ic - xs;
        let m22 = z * z * ic + c;
        return new Mat4(m00, m10, m20, 0, m01, m11, m21, 0, m02, m12, m22, 0, 0, 0, 0, 1);
    };


    public static lookAt(position, target, up): Mat4 {
        up = up.normalize();
        let f = target.subtract(position).normalize();
        let s = f.cross(up).normalize();
        let u = s.cross(f);
        let t = position.negate();
        let m00 = s.x;
        let m10 = u.x;
        let m20 = -f.x;
        let m01 = s.y;
        let m11 = u.y;
        let m21 = -f.y;
        let m02 = s.z;
        let m12 = u.z;
        let m22 = -f.z;
        let m03 = s.x * t.x + s.y * t.y + s.z * t.z;
        let m13 = u.x * t.x + u.y * t.y + u.z * t.z;
        let m23 = -f.x * t.x - f.y * t.y - f.z * t.z;
        let m33 = 1;
        return new Mat4(m00, m10, m20, 0, m01, m11, m21, 0, m02, m12, m22, 0, m03, m13, m23, m33);
    };

    public scale = (sx, sy, sz) => Mat4.scale(sx, sy, sz).multiply(this);

    public rotate = (angle, x, y, z) => Mat4.rotate(angle, x, y, z).multiply(this);

    public static perspective(left, right,
                              bottom, top, near, far): Mat4 {
        let m00 = 2 * near / (right - left);
        let m11 = 2 * near / (top - bottom);
        let m02 = (right + left) / (right - left);
        let m12 = (top + bottom) / (top - bottom);
        let m22 = -(far + near) / (far - near);
        let m32 = -1;
        let m23 = -2 * far * near / (far - near);
        return new Mat4(m00, 0, 0, 0, 0, m11, 0, 0, m02, m12, m22, m32, 0, 0, m23, 0);
    }

    public static ortho(left, right,
                        bottom, top, near, far): Mat4 {
        let dx = right - left;
        let dy = top - bottom;
        let dz = far - near;
        let tx = -(right + left) / dx;
        let ty = -(top + bottom) / dy;
        let tz = -(far + near) / dz;
        let m00 = 2.0 / dx;
        let m11 = 2.0 / dy;
        let m22 = -2.0 / dz;
        let m03 = tx;
        let m13 = ty;
        let m23 = tz;
        let m33 = 1;
        return new Mat4(m00, 0, 0, 0, 0, m11, 0, 0, 0, 0, m22, 0, m03, m13, m23, m33);
    }

    transform(vec) {
        let x = this.m00 * vec.x + this.m01 * vec.y + this.m02 * vec.z + this.m03 * vec.w;
        let y = this.m10 * vec.x + this.m11 * vec.y + this.m12 * vec.z + this.m13 * vec.w;
        let z = this.m20 * vec.x + this.m21 * vec.y + this.m22 * vec.z + this.m23 * vec.w;
        let w = this.m30 * vec.x + this.m31 * vec.y + this.m32 * vec.z + this.m33 * vec.w;
        return new Vec4(x, y, z, w);
    }

    multiply(mat: Mat4) {
        let m00 = this.m00 * mat.m00 + this.m01 * mat.m10 + this.m02 * mat.m20 + this.m03 * mat.m30;
        let m10 = this.m10 * mat.m00 + this.m11 * mat.m10 + this.m12 * mat.m20 + this.m13 * mat.m30;
        let m20 = this.m20 * mat.m00 + this.m21 * mat.m10 + this.m22 * mat.m20 + this.m23 * mat.m30;
        let m30 = this.m30 * mat.m00 + this.m31 * mat.m10 + this.m32 * mat.m20 + this.m33 * mat.m30;

        let m01 = this.m00 * mat.m01 + this.m01 * mat.m11 + this.m02 * mat.m21 + this.m03 * mat.m31;
        let m11 = this.m10 * mat.m01 + this.m11 * mat.m11 + this.m12 * mat.m21 + this.m13 * mat.m31;
        let m21 = this.m20 * mat.m01 + this.m21 * mat.m11 + this.m22 * mat.m21 + this.m23 * mat.m31;
        let m31 = this.m30 * mat.m01 + this.m31 * mat.m11 + this.m32 * mat.m21 + this.m33 * mat.m31;

        let m02 = this.m00 * mat.m02 + this.m01 * mat.m12 + this.m02 * mat.m22 + this.m03 * mat.m32;
        let m12 = this.m10 * mat.m02 + this.m11 * mat.m12 + this.m12 * mat.m22 + this.m13 * mat.m32;
        let m22 = this.m20 * mat.m02 + this.m21 * mat.m12 + this.m22 * mat.m22 + this.m23 * mat.m32;
        let m32 = this.m30 * mat.m02 + this.m31 * mat.m12 + this.m32 * mat.m22 + this.m33 * mat.m32;

        let m03 = this.m00 * mat.m03 + this.m01 * mat.m13 + this.m02 * mat.m23 + this.m03 * mat.m33;
        let m13 = this.m10 * mat.m03 + this.m11 * mat.m13 + this.m12 * mat.m23 + this.m13 * mat.m33;
        let m23 = this.m20 * mat.m03 + this.m21 * mat.m13 + this.m22 * mat.m23 + this.m23 * mat.m33;
        let m33 = this.m30 * mat.m03 + this.m31 * mat.m13 + this.m32 * mat.m23 + this.m33 * mat.m33;

        return new Mat4(m00, m10, m20, m30,
            m01, m11, m21, m31,
            m02, m12, m22, m32,
            m03, m13, m23, m33);

    }

    public transform3(vec) {
        let vecw = 1;
        let x = this.m00 * vec.x + this.m01 * vec.y + this.m02 * vec.z + this.m03 * vecw;
        let y = this.m10 * vec.x + this.m11 * vec.y + this.m12 * vec.z + this.m13 * vecw;
        let z = this.m20 * vec.x + this.m21 * vec.y + this.m22 * vec.z + this.m23 * vecw;
        let w = this.m30 * vec.x + this.m31 * vec.y + this.m32 * vec.z + this.m33 * vecw;
        return new Vec3(x, y, z);
    }

    public transpose() {
        return new Mat4(this.m00, this.m01, this.m02, this.m03,
            this.m10, this.m11, this.m12, this.m13,
            this.m20, this.m21, this.m22, this.m23,
            this.m30, this.m31, this.m32, this.m33);
    }

    determinant() {
        return this.m30 * this.m21 * this.m12 * this.m03 - this.m20 * this.m31 * this.m12 * this.m03 - this.m30 * this.m11 * this.m22 * this.m03
            + this.m10 * this.m31 * this.m22 * this.m03 + this.m20 * this.m11 * this.m32 * this.m03 - this.m10 * this.m21 * this.m32 * this.m03
            - this.m30 * this.m21 * this.m02 * this.m13 + this.m20 * this.m31 * this.m02 * this.m13 + this.m30 * this.m01 * this.m22 * this.m13
            - this.m00 * this.m31 * this.m22 * this.m13 - this.m20 * this.m01 * this.m32 * this.m13 + this.m00 * this.m21 * this.m32 * this.m13
            + this.m30 * this.m11 * this.m02 * this.m23 - this.m10 * this.m31 * this.m02 * this.m23 - this.m30 * this.m01 * this.m12 * this.m23
            + this.m00 * this.m31 * this.m12 * this.m23 + this.m10 * this.m01 * this.m32 * this.m23 - this.m00 * this.m11 * this.m32 * this.m23
            - this.m20 * this.m11 * this.m02 * this.m33 + this.m10 * this.m21 * this.m02 * this.m33 + this.m20 * this.m01 * this.m12 * this.m33
            - this.m00 * this.m21 * this.m12 * this.m33 - this.m10 * this.m01 * this.m22 * this.m33 + this.m00 * this.m11 * this.m22 * this.m33;
    }

    inverse() {
        let d = this.determinant();
        if (d == 0)
            return undefined;

        let v00 = (this.m12 * this.m23 * this.m31 - this.m13 * this.m22 * this.m31 + this.m13 * this.m21 * this.m32 - this.m11 * this.m23 * this.m32 - this.m12 * this.m21 * this.m33 + this.m11 * this.m22 * this.m33) / d;
        let v01 = (this.m03 * this.m22 * this.m31 - this.m02 * this.m23 * this.m31 - this.m03 * this.m21 * this.m32 + this.m01 * this.m23 * this.m32 + this.m02 * this.m21 * this.m33 - this.m01 * this.m22 * this.m33) / d;
        let v02 = (this.m02 * this.m13 * this.m31 - this.m03 * this.m12 * this.m31 + this.m03 * this.m11 * this.m32 - this.m01 * this.m13 * this.m32 - this.m02 * this.m11 * this.m33 + this.m01 * this.m12 * this.m33) / d;
        let v03 = (this.m03 * this.m12 * this.m21 - this.m02 * this.m13 * this.m21 - this.m03 * this.m11 * this.m22 + this.m01 * this.m13 * this.m22 + this.m02 * this.m11 * this.m23 - this.m01 * this.m12 * this.m23) / d;
        let v10 = (this.m13 * this.m22 * this.m30 - this.m12 * this.m23 * this.m30 - this.m13 * this.m20 * this.m32 + this.m10 * this.m23 * this.m32 + this.m12 * this.m20 * this.m33 - this.m10 * this.m22 * this.m33) / d;
        let v11 = (this.m02 * this.m23 * this.m30 - this.m03 * this.m22 * this.m30 + this.m03 * this.m20 * this.m32 - this.m00 * this.m23 * this.m32 - this.m02 * this.m20 * this.m33 + this.m00 * this.m22 * this.m33) / d;
        let v12 = (this.m03 * this.m12 * this.m30 - this.m02 * this.m13 * this.m30 - this.m03 * this.m10 * this.m32 + this.m00 * this.m13 * this.m32 + this.m02 * this.m10 * this.m33 - this.m00 * this.m12 * this.m33) / d;
        let v13 = (this.m02 * this.m13 * this.m20 - this.m03 * this.m12 * this.m20 + this.m03 * this.m10 * this.m22 - this.m00 * this.m13 * this.m22 - this.m02 * this.m10 * this.m23 + this.m00 * this.m12 * this.m23) / d;
        let v20 = (this.m11 * this.m23 * this.m30 - this.m13 * this.m21 * this.m30 + this.m13 * this.m20 * this.m31 - this.m10 * this.m23 * this.m31 - this.m11 * this.m20 * this.m33 + this.m10 * this.m21 * this.m33) / d;
        let v21 = (this.m03 * this.m21 * this.m30 - this.m01 * this.m23 * this.m30 - this.m03 * this.m20 * this.m31 + this.m00 * this.m23 * this.m31 + this.m01 * this.m20 * this.m33 - this.m00 * this.m21 * this.m33) / d;
        let v22 = (this.m01 * this.m13 * this.m30 - this.m03 * this.m11 * this.m30 + this.m03 * this.m10 * this.m31 - this.m00 * this.m13 * this.m31 - this.m01 * this.m10 * this.m33 + this.m00 * this.m11 * this.m33) / d;
        let v23 = (this.m03 * this.m11 * this.m20 - this.m01 * this.m13 * this.m20 - this.m03 * this.m10 * this.m21 + this.m00 * this.m13 * this.m21 + this.m01 * this.m10 * this.m23 - this.m00 * this.m11 * this.m23) / d;
        let v30 = (this.m12 * this.m21 * this.m30 - this.m11 * this.m22 * this.m30 - this.m12 * this.m20 * this.m31 + this.m10 * this.m22 * this.m31 + this.m11 * this.m20 * this.m32 - this.m10 * this.m21 * this.m32) / d;
        let v31 = (this.m01 * this.m22 * this.m30 - this.m02 * this.m21 * this.m30 + this.m02 * this.m20 * this.m31 - this.m00 * this.m22 * this.m31 - this.m01 * this.m20 * this.m32 + this.m00 * this.m21 * this.m32) / d;
        let v32 = (this.m02 * this.m11 * this.m30 - this.m01 * this.m12 * this.m30 - this.m02 * this.m10 * this.m31 + this.m00 * this.m12 * this.m31 + this.m01 * this.m10 * this.m32 - this.m00 * this.m11 * this.m32) / d;
        let v33 = (this.m01 * this.m12 * this.m20 - this.m02 * this.m11 * this.m20 + this.m02 * this.m10 * this.m21 - this.m00 * this.m12 * this.m21 - this.m01 * this.m10 * this.m22 + this.m00 * this.m11 * this.m22) / d;

        return new Mat4(v00, v10, v20, v30, v01, v11, v21, v31, v02, v12, v22, v32, v03, v13, v23, v33);
    }

}
