import * as C from '../constants';

class Grid {
  constructor() {
    this.cells = Array(C.BOARD_HEIGHT_CELLS);

    for(let i = 0; i < C.BOARD_HEIGHT_CELLS; i++){
      this.cells[i] = Array(C.BOARD_WIDTH_CELLS).fill(null);
    }
  }

  getAsArray() {
    return this.cells;
  }
}

export default Grid;