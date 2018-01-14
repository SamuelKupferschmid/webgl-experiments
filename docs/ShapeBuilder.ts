export class ShapeBuilder {
    public static GetCuboid() : number[] {
        let a = [-1, -1, -1];
        let b = [1, -1, -1];
        let c = [-1, 1, -1];
        let d = [1, 1, -1];

        let e = [-1, -1, 1];
        let f = [1, -1, 1];
        let g = [-1, 1, 1];
        let h = [1, 1, 1];


        let triangles = [
            //bottom
            a,b,d,
            a,c,d,
            //top
            e,f,h,
            e,g,h,
            //sides
            a,b,f,
            a,e,f,

            b,d,h,
            b,f,h,

            c,d,h,
            c,g,h,

            a,c,g,
            a,e,g
        ];

        let flatten = <T>(a,b) => a.concat(b);

        return triangles.reduce(flatten, []);
    }
}