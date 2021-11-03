import Grid from "./grid";
import Vect2 from "./vect2";

export default class Node {
  pos: Vect2;

  f: number;
  g: number;
  h: number;
  neighbors: Vect2[];
  cameFrom: Vect2 | null;

  constructor(x: number, y: number) {
    this.pos = new Vect2(x, y);
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.neighbors = [];
    this.cameFrom = null;
  }

  setF(f: number) {
    this.f = f
  }

  setG(g: number) {
    this.g = g
  }

  setH(h: number) {
    this.h = h
  }

  setCameFrom(cameFrom: Vect2) {
    this.cameFrom = cameFrom
  }

  setNeighbors(grid: Grid<Node>) {
    let neighbors = [];

    const w = grid.getWidth();
    const h = grid.getHeight();

    if (this.pos.y < h - 1)
      neighbors.push(new Vect2(this.pos.x, this.pos.y + 1));
    if (this.pos.y > 0)
      neighbors.push(new Vect2(this.pos.x, this.pos.y - 1))
    if (this.pos.x < w - 1)
      neighbors.push(new Vect2(this.pos.x + 1, this.pos.y))
    if (this.pos.x > 0)
      neighbors.push(new Vect2(this.pos.x - 1, this.pos.y))
    if (this.pos.x > 0 && this.pos.y > 0)
      neighbors.push(new Vect2(this.pos.x - 1, this.pos.y - 1))
    if (this.pos.x > 0 && this.pos.y < h - 1)
      neighbors.push(new Vect2(this.pos.x - 1, this.pos.y + 1))
    if (this.pos.x < w - 1 && this.pos.y > 0)
      neighbors.push(new Vect2(this.pos.x + 1, this.pos.y - 1))
    if (this.pos.x < w - 1 && this.pos.y < h - 1)
      neighbors.push(new Vect2(this.pos.x + 1, this.pos.y + 1))


    this.neighbors = neighbors;
  }

  calcF() {
    this.f = this.g + this.h;
  }
}