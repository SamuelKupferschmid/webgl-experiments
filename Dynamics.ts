export class Dynamics {

    public static euler(x: number[], dt: number, func: { (x: number[]): number[] }): number[] {
        let y = func(x);

        return x.map((_x, i) => _x + y[i] * dt);
    }

    public static runge(x: number[], dt: number, func: { (x: number[]): number[] }): number[] {
        let y = func(x);

        x = x.map((_,i)=>x[i] + dt * y[i] / 2);

        y = func(x);
        x = x.map((_,i)=>x[i] + dt * y[i] / 2);

        y = func(x);
        x = x.map((_,i)=>x[i] + dt * y[i] / 2);

        y = func(x);
        x = x.map((_,i)=>x[i] + dt * y[i]);

        return x;
    }
}