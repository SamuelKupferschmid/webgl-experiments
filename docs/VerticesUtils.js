"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VerticesUtils = /** @class */ (function () {
    function VerticesUtils() {
    }
    VerticesUtils.createCirlcePoints = function (n, angle, startAngle) {
        if (angle === void 0) { angle = Math.PI * 2; }
        if (startAngle === void 0) { startAngle = 0; }
        var arr = [0, 0];
        var stepAngle = angle / n;
        for (var i = 0; i <= n; i++) {
            var angle_1 = stepAngle * i + startAngle;
            arr.push(Math.cos(angle_1), Math.sin(angle_1));
        }
        return arr;
    };
    return VerticesUtils;
}());
exports.VerticesUtils = VerticesUtils;
//# sourceMappingURL=VerticesUtils.js.map