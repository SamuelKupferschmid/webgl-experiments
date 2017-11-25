export class Dynamics {

    public static Lorenz(x: number[]): number[] {
        let [x1, x2, x3] = [...x];


        return [10 * x2 - 10 * x1, 28 * x1 - x2 - x1 * x3, x1 * x2 - 8 * x3 / 3];
    }

    public euler(x: number[], dt: number, func: { (x: number[]): number[] }): number[] {
        let y = func(x);

        return x.map((_x, i) => _x + y[i] * dt);

    }
}