import Grid from "./grid";
import Perlin from "./perlin";
import Vect2 from "./vect2";

const generateMap = (canvas: OffscreenCanvas | HTMLCanvasElement, gridWidth: number) => {
  const w = canvas.width;
  const h = canvas.height;

  const gridW = Math.round(gridWidth)
  const gridH = Math.round(h * gridW / w);

  return new Map(gridW, gridH, canvas);
}

class Map {
  private grid: Grid<boolean>;
  private ctx: OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D;

  constructor(w: number, h: number, canvas: OffscreenCanvas | HTMLCanvasElement) {
    this.grid = new Grid(w, h, false);

    const ctx = canvas.getContext("2d");

    if (!ctx)
      throw new Error("Could not get context from canvas!")

    this.ctx = ctx;
  }

  getGrid() {
    return this.grid;
  }
  getGridDim() {
    return [this.grid.getWidth(), this.grid.getHeight()]
  }

  getCellDim() {
    return [
      this.ctx.canvas.width / this.grid.getWidth(),
      this.ctx.canvas.height / this.grid.getHeight()
    ]
  }

  getCanvasPoint(x: number, y: number) {
    const [cellW, cellH] = this.getCellDim();
    return [x * cellW + cellW / 2, y * cellH + cellH / 2]
  }

  generateNoise() {
    const perlin = new Perlin(this.grid.getWidth(), this.grid.getHeight(), 0.15)

    this.grid.map((val, x, y) => {
      return perlin.getNoise(new Vect2(x, y)) > 0.1
    })
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }

  drawGridCircles(r: number, open: number[][], close: number[][]) {
    this.grid.forEach((val, x, y) => {
      if (val) {
        this.ctx.fillStyle = "#ffffff30"
      } else if (open.filter(val => val[0] == x && val[1] == y).length) {
        this.ctx.fillStyle = "#3F3F62"
      } else if (close.filter(val => val[0] == x && val[1] == y).length) {
        this.ctx.fillStyle = "#26263C"
      } else {
        this.ctx.fillStyle = "#ffffff09"
      }

      [x, y] = this.getCanvasPoint(x, y)

      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.closePath();
    })
  }

  drawPath(path: number[][], lineWidth: number) {
    this.ctx.strokeStyle = "#585889"
    // this.ctx.strokeStyle = "#ffffff66"
    this.ctx.lineWidth = lineWidth
    this.ctx.lineCap = "round"
    this.ctx.lineJoin = "round"
    this.ctx.beginPath()

    if (path.length > 0) {
      let start = path.shift();

      if (start) {
        let [startX, startY] = start;
        [startX, startY] = this.getCanvasPoint(startX, startY)

        this.ctx.moveTo(startX, startY)

        for (let [x, y] of path) {
          [x, y] = this.getCanvasPoint(x, y)
          this.ctx.lineTo(x, y)
        }

        this.ctx.stroke()
        this.ctx.closePath()
      }
    }
  }
}

export {
  generateMap
}

export default Map;