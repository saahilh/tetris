import * as C from '../constants';

class Grid {
  constructor(activeBlock, addScore) {
    this.cells = Array(C.BOARD_HEIGHT_CELLS).fill(null).map(() => Array(C.BOARD_WIDTH_CELLS).fill(null));
    this.activeBlock = activeBlock;
    this.addScore = addScore;
  }

  setActiveBlock = (block) => {
    this.activeBlock = block;
  }

  getActiveBlock = () => this.activeBlock;

  storeBlock = (block) => {
    let shape = block.getShape();

    for(let i = 0; i < shape.length; i++){
      for(let j = 0; j < shape[i].length; j++){
        if(shape[i][j]){
          this.cells[i + block.getY()][j + block.getX()] = shape[i][j];
        }
      }
    }
  }

  getCell = (row, col) => this.cells[row][col];

  setCell = (row, col, value) => {
    this.cells[row][col] = value;
  }

  clearRow = (rowNum) => {
    this.cells.splice(rowNum, 1);
    this.cells.unshift(Array(C.BOARD_WIDTH_CELLS).fill(null));
  }

  overlayBlockOntoGrid = (block, grid) => {
    let shape = block.getShape();

    for(let i = 0; i < shape.length; i++){
      for(let j = 0; j < shape[i].length; j++){
        if(shape[i][j]){
          grid[i + this.activeBlock.getY()][j + this.activeBlock.getX()] = shape[i][j];
        }
      }
    }
  }

  blockCanMoveDown = () => {
    let shape = this.getActiveBlock().getShape();
    let rowToOccupyNum = this.getActiveBlock().getY() + shape.length;
    
    if(rowToOccupyNum >= C.BOARD_HEIGHT_CELLS){
      return false;
    }

    let rowToOccupy = this.cells[rowToOccupyNum];
    let bottomOfShape = shape[shape.length - 1];

    for(let i = 0; i < bottomOfShape.length; i++){
      if(bottomOfShape[i] && rowToOccupy[this.getActiveBlock().getX() + i]){ // Block collision
        return false;
      }
    }
    
    return true;
  }

  blockCanMoveLeft = () => {
    let shape = this.getActiveBlock().getShape();
    let colToOccupyNum = this.getActiveBlock().getX() - 1;

    if(colToOccupyNum < 0){
      return false;
    }
    
    for(let i = 0; i < shape.length; i++){
      let cellAtLeftOfShape = shape[i][0];
      let cellToLeftOfBlock = this.cells[colToOccupyNum][this.getActiveBlock().getY() + i];

      if(cellAtLeftOfShape && cellToLeftOfBlock){ // Block collision
        return false;
      }
    }
    
    return true;
  }

  blockCanMoveRight = () => {
    return true;
  }

  blockCanRotate = () => {
    return true;
  }

  getView = () => {
    let currentCells = this.cells;

    if(this.activeBlock){
      // Create copy of cells to avoid modifying current saved list
      currentCells = this.cells.map((row) => [...row]);
      this.overlayBlockOntoGrid(this.activeBlock, currentCells);
    }

    return currentCells;
  }
}

export default Grid;