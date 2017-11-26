"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Dynamics = /** @class */ (function () {
    function Dynamics() {
    }
    Dynamics.euler = function (x, dt, func) {
        var y = func(x);
        return x.map(function (_x, i) { return _x + y[i] * dt; });
    };
    Dynamics.runge = function (x, dt, func) {
        var y = func(x);
        x = x.map(function (_, i) { return x[i] + dt * y[i] / 2; });
        y = func(x);
        x = x.map(function (_, i) { return x[i] + dt * y[i] / 2; });
        y = func(x);
        x = x.map(function (_, i) { return x[i] + dt * y[i] / 2; });
        y = func(x);
        x = x.map(function (_, i) { return x[i] + dt * y[i]; });
        return x;
    };
    return Dynamics;
}());
exports.Dynamics = Dynamics;
//# sourceMappingURL=Dynamics.js.map