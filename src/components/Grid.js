import * as C from '../constants';

class Grid {
  constructor(addScore) {
    this.cells = Array(C.BOARD_HEIGHT_CELLS).fill(null).map(() => Array(C.BOARD_WIDTH_CELLS).fill(null));
    this.addScore = addScore;
  }

  storeBlock = (block) => {
    let shape = block.getShape();

    for(let i = 0; i < shape.length; i++){
      for(let j = 0; j < shape[i].length; j++){
        if(shape[i][j]){
          this.setCell(block.getY() + i, block.getX() + j, shape[i][j]);
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

  blockCanMoveDown = (block) => {
    let shape = block.getShape();
    let rowToOccupyNum = block.getY() + shape.length;
    
    if(rowToOccupyNum >= C.BOARD_HEIGHT_CELLS){
      return false;
    }

    let rowToOccupy = this.cells[rowToOccupyNum];
    let bottomOfShape = shape[shape.length - 1];

    for(let i = 0; i < bottomOfShape.length; i++){
      if(bottomOfShape[i] && rowToOccupy[block.getX() + i]){ // Block collision
        return false;
      }
    }
    
    return true;
  }

  blockCanMoveLeft = (block) => {
    let shape = block.getShape();
    let colToOccupyNum = block.getX() - 1;

    if(colToOccupyNum < 0){
      return false;
    }
    
    for(let i = 0; i < shape.length; i++){
      let cellAtLeftOfShape = shape[i][0];
      let cellToLeftOfBlock = this.cells[colToOccupyNum][block.getY() + i];

      if(cellAtLeftOfShape && cellToLeftOfBlock){ // Block collision
        return false;
      }
    }
    
    return true;
  }

  blockCanMoveRight = (block) => {
    return true;
  }

  blockCanRotate = (block) => {
    return true;
  }

  getView = () => this.cells.map((row) => [...row]);

  getViewWithBlock = (block) => {
    // Create copy of cells to avoid modifying current saved list
    let view = this.getView();
    let shape = block.getShape();

    for(let i = 0; i < shape.length; i++){
      for(let j = 0; j < shape[i].length; j++){
        if(shape[i][j]){
          view[i + block.getY()][j + block.getX()] = shape[i][j];
        }
      }
    }

    return view;
  }
}

export default Grid;