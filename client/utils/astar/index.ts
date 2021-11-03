import Vect2 from './vect2';
import Node from './node';
import Map, { generateMap } from './map';
import Grid from './grid';

export default class AStar {
  map: Map;
  path: Vect2[];
  grid: Grid<Node>;
  goalNode: Vect2;
  open: Vect2[];
  closed: Vect2[];
  isLooping: boolean;

  completed: boolean;

  constructor(canvas: OffscreenCanvas | HTMLCanvasElement, gridWidth: number) {
    this.map = generateMap(canvas, gridWidth);

    const [w, h] = this.map.getGridDim();

    this.grid = new Grid(w, h, new Node(0, 0));

    this.initGrid();

    this.goalNode = new Vect2(
      this.grid.getWidth() - 1,
      this.grid.getHeight() - 1
    )

    this.open = [new Vect2(0, 0)];
    this.closed = [];
    this.path = [];

    this.completed = false;
    this.isLooping = true;
  }

  reset() {
    this.initGrid();

    this.goalNode = new Vect2(
      this.grid.getWidth() - 1,
      this.grid.getHeight() - 1
    )

    this.open = [new Vect2(0, 0)];
    this.closed = [];
    this.path = [];

    this.completed = false;
    this.isLooping = true;
  }

  initGrid() {
    this.map.generateNoise()

    this.grid.map((val, x, y) => {
      return new Node(x, y)
    })

    this.grid.forEach((val) => {
      val.setNeighbors(this.grid)
    })
  }

  distance(node: Node) {
    const dy = Math.abs(node.pos.y - this.goalNode.y);
    const dx = Math.abs(node.pos.x - this.goalNode.x);

    const D = 1;
    const D2 = Math.sqrt(2);

    return D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy)
  }

  render() {
    this.map.clear()

    const close = this.closed.map(node => {
      return [node.x, node.y]
    })

    const open = this.open.map(node => {
      return [node.x, node.y]
    })

    this.map.drawGridCircles(6, open, close);

    const path = this.path.map(node => {
      return [node.x, node.y]
    })

    this.map.drawPath(path, 6)
  }

  getNode(vect: Vect2) {
    return this.grid.getVal(vect.x, vect.y)
  }

  next(n: number = 1) {
    let current;

    for (let i = 0; i < n; i++) {
      if (this.open.length > 0) {
        let winner = 0;

        for (let i = 0; i < this.open.length; i++) {
          if (this.getNode(this.open[i]).f < this.getNode(this.open[winner]).f) {
            winner = i;
          }
        }

        current = this.getNode(this.open[winner]);

        if (!current.pos.equals(this.goalNode)) {

          for (let i = this.open.length - 1; i >= 0; i--)
            if (this.open[i].equals(current.pos))
              this.open.splice(i, 1);

          this.closed.push(current.pos);

          let neighbors = current.neighbors;

          for (let i = 0; i < neighbors.length; i++) {
            let neighbor = neighbors[i];

            if (
              this.closed.filter(pos => pos.equals(neighbor)).length == 0 &&
              !this.map.getGrid().getVal(neighbor.x, neighbor.y)
            ) {
              let g = current.g + 1;

              if (neighbor.x != current.pos.x && neighbor.y != current.pos.y) {
                g = current.g + Math.sqrt(2);
              }

              if ((this.open.filter(pos => pos.equals(neighbor)).length > 0)) {
                if (g < this.getNode(neighbor).g) {
                  this.getNode(neighbor).setG(g);
                  this.getNode(neighbor).setCameFrom(current.pos);
                }
              } else {
                this.getNode(neighbor).setCameFrom(current.pos);
                this.getNode(neighbor).setG(g);
                this.open.push(neighbor);
              }

              this.getNode(neighbor).setH(this.distance(this.getNode(neighbor)));
              this.getNode(neighbor).calcF()
            }
          }
        } else {
          this.isLooping = false;
          this.completed = true;
        }
      }
    }

    this.path = [];

    let temp = current;
    if (temp) {
      this.path.push(temp.pos);
      while (temp && temp.cameFrom) {
        this.path.push(this.getNode(temp.cameFrom).pos);
        temp = this.getNode(temp.cameFrom);
      }
    }

    if (!current) {
      this.completed = true;

      this.isLooping = false;
    }
  }
}