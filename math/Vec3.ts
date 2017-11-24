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

    public length = () => Math.sqrt(Math.pow(this._x,2) + Math.pow(this._y,2) + Math.pow(this._z,2));

    public subtract = (v: Vec3) => new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);

    public distance = (vec: Vec3) => this.subtract(vec).length;

    public add = (vec: Vec3) => new Vec3(this.x + vec.x, this.y + vec.y, this.z + vec.z);



public
Vec3
scale(float
s
)
{
    return new Vec3(x * s, y * s, z * s);
}

public
Vec3
negate()
{
    return scale(-1);
}

public
Vec3
normalize()
{
    float
    l = length();
    if (MathUtil.isZero(l) || l == 1)
        return this;
    return new Vec3(x / l, y / l, z / l);
}

public
float
dot(Vec3
a
)
{
    return MathUtil.dot(x, y, z, a.x, a.y, a.z);
}

public
Vec3
cross(Vec3
a
)
{
    return new Vec3(y * a.z - z * a.y, z * a.x - x * a.z, x * a.y - y * a.x);
}

@Override
public
boolean
equals(Object
obj
)
{
    if (this == obj) {
        return true;
    }

    if (obj instanceof Vec3) {
        final
        Vec3
        v = (Vec3)
        obj;
        return (x == v.x) && (y == v.y) && (z == v.z);
    }
    return false;
}

@Override
public
Vec3
toVec3()
{
    return this;
}

@Override
public
float[]
toArray()
{
    return new float[]
    {
        x, y, z
    }
    ;
}

@Override
public
String
toString()
{
    return String.format("[% .2f,% .2f,% .2f]", x, y, z);
}

public static
float[]
toArray(List < ?
extends
Vec3 > vectors
)
{
    if (vectors == null)
        return null;

    float[]
    result = new float[vectors.size() * 3];
    int
    i = 0;
    for (Vec3 v : vectors
)
    {
        result[i++] = v.x;
        result[i++] = v.y;
        result[i++] = v.z;
    }
    return result;
}
}