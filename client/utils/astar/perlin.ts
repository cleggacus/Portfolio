import Grid from "./grid";
import Vect2, { randomVect2 } from "./vect2";

export default class Perlin {
  private noise: Grid<Vect2>;
  private res: number;

  constructor(w: number, h: number, res: number) {
    w = Math.ceil(res * w) + 1;
    h = Math.ceil(res * h) + 1;


    this.noise = new Grid(w, h, new Vect2(0, 0));

    this.res = res;
    this.generateNoise();
  }

  generateNoise() {
    const start = new Vect2(0, 0);
    const end = new Vect2(
      this.noise.getWidth() - 1,
      this.noise.getHeight() - 1
    )

    this.noise.map((val, x, y) => {
      const pos = new Vect2(x, y);

      if (pos.dist(start) <= this.noise.getWidth() / 7 || pos.dist(end) <= this.noise.getWidth() / 5)
        return new Vect2(0, 0)

      return randomVect2();
    })
  }

  getNoise(pos: Vect2) {
    let x = this.res * pos.x;
    let y = this.res * pos.y;

    if (
      Math.ceil(x) >= this.noise.getWidth() || x < 0 ||
      Math.ceil(y) >= this.noise.getHeight() || y < 0
    ) return 0;

    const p1 = this.noise.getVal(Math.floor(x), Math.floor(y));
    const p2 = this.noise.getVal(Math.floor(x), Math.ceil(y));
    const p3 = this.noise.getVal(Math.ceil(x), Math.floor(y));
    const p4 = this.noise.getVal(Math.ceil(x), Math.ceil(y));

    const p1d = new Vect2(x - Math.floor(x), y - Math.floor(y));
    const p2d = new Vect2(x - Math.floor(x), y - Math.ceil(y));
    const p3d = new Vect2(x - Math.ceil(x), y - Math.floor(y));
    const p4d = new Vect2(x - Math.ceil(x), y - Math.ceil(y));

    const p1p = p1.dotProd(p1d);
    const p2p = p2.dotProd(p2d);
    const p3p = p3.dotProd(p3d);
    const p4p = p4.dotProd(p4d);

    const a = p1p + this.smooth(p1d.x) * (p3p - p1p);
    const b = p2p + this.smooth(p2d.x) * (p4p - p2p);
    return a + this.smooth(p1d.y) * (b - a);
  }

  smooth(x: number) {
    return 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
  }
}