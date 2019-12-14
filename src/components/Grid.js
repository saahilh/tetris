import * as C from '../constants';

class Grid {
  constructor() {
    this.cells = Array(C.BOARD_HEIGHT_CELLS);

    for(let i = 0; i < C.BOARD_HEIGHT_CELLS; i++){
      this.cells[i] = Array(C.BOARD_WIDTH_CELLS).fill(null);
    }
  }

  setActiveBlock(block) {
    this.activeBlock = block;
  }

  getView() {
    // TODO: make this return the existing cells with active block imposed atop it
    // currently only returns the existing cells
    return this.cells;
  }
}

export default Grid;