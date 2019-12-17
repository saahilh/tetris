import * as C from '../constants';

class Grid {
  constructor(addScore) {
    this.cells = Array(C.BOARD_HEIGHT_CELLS).fill(null).map(() => Array(C.BOARD_WIDTH_CELLS).fill(null));
    this.addScore = addScore;
  }

  getCell = (row, col) => this.cells[row][col];

  setCell = (row, col, value) => {
    this.cells[row][col] = value;
  }

  clearRow = (rowNum) => {
    this.cells.splice(rowNum, 1);
    this.cells.unshift(Array(C.BOARD_WIDTH_CELLS).fill(null));
  }

  blockCanMoveDown = (block) => {
    let rowToOccupyNum = block.getRow() + block.getHeight();

    if(rowToOccupyNum >= C.BOARD_HEIGHT_CELLS){
      return false;
    }

    let shape = block.getShape();
    let rowToOccupy = this.cells[rowToOccupyNum];
    let bottomOfShape = shape[block.getHeight() - 1];

    for(let i = 0; i < bottomOfShape.length; i++){
      if(bottomOfShape[i] && rowToOccupy[block.getCol() + i]){ // Block collision
        return false;
      }
    }
    
    return true;
  }

  blockCanMoveLeft = (block) => {
    if(block.getCol() - 1 < 0){
      return false;
    }

    let shape = block.getShape();
    
    for(let i = 0; i < block.getWidth(); i++){
      for(let j = 0; j < block.getHeight(); j++){
        let cellAtLeftOfShape = shape[j][i];
        let cellToLeftOfBlock = this.cells[block.getRow() + j][block.getCol() - 1 + i];

        if(cellAtLeftOfShape && cellToLeftOfBlock){ // Block collision
          return false;
        }
      }
    }
    
    return true;
  }

  blockCanMoveRight = (block) => {
    if(block.getCol() + block.getWidth() + 1 >= C.BOARD_WIDTH_CELLS){
      return false;
    }

    let shape = block.getShape();
    
    for(let i = 0; i < block.getWidth(); i++){
      for(let j = 0; j < block.getHeight(); j++){
        let cellAtRightOfShape = shape[j][i];
        let cellToRightOfBlock = this.cells[block.getRow() + j][block.getCol() + 1 + i];

        if(cellAtRightOfShape && cellToRightOfBlock){ // Block collision
          return false;
        }
      }
    }
    
    return true;
  }

  blockCanRotate = (block) => {
    return true;
  }

  getView = () => this.cells.map((row) => [...row]);

  drawViewWithBlock = (view, block) => {
    // Create copy of cells to avoid modifying current saved list
    let shape = block.getShape();

    for(let i = 0; i < shape.length; i++){
      for(let j = 0; j < shape[i].length; j++){
        if(shape[i][j]){
          view[i + block.getRow()][j + block.getCol()] = shape[i][j];
        }
      }
    }

    return view;
  }

  storeBlock = (block) => {
    let shape = block.getShape();

    for(let i = 0; i < shape.length; i++){
      for(let j = 0; j < shape[i].length; j++){
        if(shape[i][j]){
          this.setCell(block.getRow() + i, block.getCol() + j, shape[i][j]);
        }
      }
    }
  }
}

export default Grid;