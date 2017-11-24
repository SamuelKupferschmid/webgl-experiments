export class VerticesUtils {
    public static createCirlcePoints(n : number, angle = Math.PI * 2, startAngle = 0) : number[] {
        let arr = [0, 0];

        let stepAngle = angle / n;

        for(let i = 0; i <= n;i++) {
            let angle = stepAngle * i + startAngle;
            arr.push(Math.cos(angle), Math.sin(angle));
        }

        return arr;
    }
}