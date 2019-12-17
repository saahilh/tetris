import * as C from '../constants';
import Block from './Block';

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

  storeActiveBlock = () => {
    let shape = this.activeBlock.getShape();

    for(let i = 0; i < shape.length; i++){
      for(let j = 0; j < shape[i].length; j++){
        if(shape[i][j]){
          this.cells[i + this.activeBlock.getY()][j + this.activeBlock.getX()] = shape[i][j];
        }
      }
    }
  }

  clearFilledRows = () => {
    let score = 0;

    for(let i = 0; i < C.BOARD_HEIGHT_CELLS; i++){
      let filled = true;

      for(let j = 0; j < C.BOARD_WIDTH_CELLS; j++){
        if(!this.cells[i][j]){
          filled = false;
          break;
        }
      }

      if(filled){
        this.cells.splice(i, 1);
        this.cells.unshift(Array(C.BOARD_WIDTH_CELLS).fill(null));
        score += 1;
      }
    }

    return score;
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
    let shape = this.activeBlock.getShape();
    let rowToOccupyNum = this.activeBlock.getY() + shape.length;
    
    if(rowToOccupyNum >= C.BOARD_HEIGHT_CELLS){
      return false;
    }

    let rowToOccupy = this.cells[rowToOccupyNum];
    let bottomOfShape = shape[shape.length - 1];

    for(let i = 0; i < bottomOfShape.length; i++){
      if(bottomOfShape[i] && rowToOccupy[this.activeBlock.getX() + i]){ // Block collision
        return false;
      }
    }
    
    return true;
  }

  blockCanMoveLeft = () => {
    let shape = this.activeBlock.getShape();
    let colToOccupyNum = this.activeBlock.getX() - 1;

    if(colToOccupyNum < 0){
      return false;
    }
    
    for(let i = 0; i < shape.length; i++){
      let cellAtLeftOfShape = shape[i][0];
      let cellToLeftOfBlock = this.cells[colToOccupyNum][this.activeBlock.getY() + i];

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