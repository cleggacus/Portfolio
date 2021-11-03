class Grid<CellType>{
  private gridArr: CellType[];
  private defaultVal: CellType;
  private w: number;
  private h: number;

  constructor(w: number, h: number, defaultVal: CellType) {
    this.w = w;
    this.h = h;
    this.defaultVal = defaultVal;
    this.gridArr = [];

    this.generateGridArray()
  }

  getWidth() {
    return this.w;
  }

  getHeight() {
    return this.h;
  }

  getGridSize() {
    return this.gridArr.length;
  }

  getVal(x: number, y: number) {
    return this.gridArr[y * this.w + x];
  }

  setVal(x: number, y: number, val: CellType) {
    this.gridArr[y * this.w + x] = val;
  }

  map(func: (value: CellType, x: number, y: number) => CellType) {
    for (let i = 0; i < this.w * this.h; i++) {
      this.gridArr[i] = func(this.gridArr[i], (i % this.w), (~~(i / this.w)))
    }
  }

  forEach(func: (value: CellType, x: number, y: number) => void) {
    for (let i = 0; i < this.w * this.h; i++) {
      func(this.gridArr[i], (i % this.w), (~~(i / this.w)))
    }
  }

  generateGridArray() {
    this.gridArr = [];

    for (let i = 0; i < this.w * this.h; i++) {
      this.gridArr.push(this.defaultVal);
    }
  }
}

export default Grid;