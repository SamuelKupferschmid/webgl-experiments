"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShapeBuilder = /** @class */ (function () {
    function ShapeBuilder() {
    }
    ShapeBuilder.GetCuboid = function () {
        var a = [-1, -1, -1];
        var b = [1, -1, -1];
        var c = [-1, 1, -1];
        var d = [1, 1, -1];
        var e = [-1, -1, 1];
        var f = [1, -1, 1];
        var g = [-1, 1, 1];
        var h = [1, 1, 1];
        var triangles = [
            //bottom
            a, b, d,
            a, c, d,
            //top
            e, f, h,
            e, g, h,
            //sides
            a, b, f,
            a, e, f,
            b, d, h,
            b, f, h,
            c, d, h,
            c, g, h,
            a, c, g,
            a, e, g
        ];
        var flatten = function (a, b) { return a.concat(b); };
        return triangles.reduce(flatten, []);
    };
    return ShapeBuilder;
}());
exports.ShapeBuilder = ShapeBuilder;
//# sourceMappingURL=ShapeBuilder.js.map