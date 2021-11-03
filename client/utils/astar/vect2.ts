class Vect2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  dotProd(v: Vect2) {
    return this.x * v.x + this.y * v.y;
  }

  dist(v: Vect2) {
    return Math.sqrt((this.x - v.x) ** 2 + (this.y - v.y) ** 2);
  }

  equals(v: Vect2) {
    return v.x == this.x && v.y == this.y
  }
}

const randomVect2 = (r: number = 1) => {
  let theta = Math.random() * 2 * Math.PI;

  return new Vect2(
    r * Math.cos(theta),
    r * Math.sin(theta)
  );
}

export default Vect2
export { randomVect2 }