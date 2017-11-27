export class Vec3 {

    public static get ZERO() {
        return new Vec3(0, 0, 0);
    }

    public static ONE() {
        return new Vec3(1, 1, 1);
    }

    public static X() {
        return new Vec3(1, 0, 0);
    }

    public static Y() {
        return new Vec3(0, 1, 0);
    }

    public static Z() {
        return new Vec3(0, 0, 1);
    }

    public static X_NEG() {
        return new Vec3(-1, 0, 0);
    }

    public static Y_NEG() {
        return new Vec3(0, -1, 0);
    }

    public static Z_NEG() {
        return new Vec3(0, 0, -1);
    }

    _x: number;
    _y: number;
    _z: number;

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public get z(): number {
        return this._z
    }

    constructor(x: number, y: number, z: number) {
        this._x = x;
        this._y = y;
        this._z = z;
    }

    public length = () => Math.sqrt(Math.pow(this._x, 2) + Math.pow(this._y, 2) + Math.pow(this._z, 2));

    public subtract = (v: Vec3) => new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);

    public distance = (vec: Vec3) => this.subtract(vec).length;

    public add = (vec: Vec3) => new Vec3(this.x + vec.x, this.y + vec.y, this.z + vec.z);


    public scale(s) {
        return new Vec3(this.x * s, this.y * s, this.z * s);
    }

    public negate() {
        return this.scale(-1);
    }

    public normalize() {
        let l = this.length();
        if (l == 1)
            return this;
        return new Vec3(this.x / l, this.y / l, this.z / l);
    }

    public cross(a: Vec3) {
        return new Vec3(this.y * a.z - this.z * a.y, this.z * a.x - this.x * a.z, this.x * a.y - this.y * a.x);
    }

    public toArray = () => [this.x, this.y, this.z];
}