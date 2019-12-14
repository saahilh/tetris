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
    let currentCells = this.cells;

    if(this.activeBlock){
      let x = this.activeBlock.getX();
      let y = this.activeBlock.getY();
      
      let shape = this.activeBlock.getShape();

      for(let i = y; i < y + shape.length; i++){
        for(let j = x; j < x + shape[i-y].length; j++){
          if(shape[i-y][j-x]){
            currentCells[i][j] = shape[i-y][j-x];
          }
        }
      }
    }
    // TODO: make this return the existing cells with active block imposed atop it
    // currently only returns the existing cells
    return currentCells;
  }
}

export default Grid;