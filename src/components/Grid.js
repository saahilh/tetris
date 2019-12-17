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
    if(block.getRow() + block.getHeight() + 1 > C.BOARD_HEIGHT_CELLS){
      return false;
    }

    return this.verifyBlockMoveValid(block, {rowChange: 1, colChange: 0});
  }

  blockCanMoveLeft = (block) => {
    if(block.getCol() - 1 < 0){
      return false;
    }

    return this.verifyBlockMoveValid(block, {rowChange: 0, colChange: -1});
  }

  blockCanMoveRight = (block) => {
    if(block.getCol() + block.getWidth() + 1 > C.BOARD_WIDTH_CELLS){
      return false;
    }

    return this.verifyBlockMoveValid(block, {rowChange: 0, colChange: 1});
  }
     
  /** 
   *  Sweeps over an area to verify a block can be moved into that area
   *      rowChange: new target row position relative to current row position
   *        positive = downwards, negative = upwards
   *      colChange: new target col position relative to current col position
   *        positive = right, negative = left
   */
  verifyBlockMoveValid = (block, change = {rowChange: 0, colChange: 0}) => {
    let shape = block.getShape();

    for(let i = 0; i < block.getWidth(); i++){
      for(let j = 0; j < block.getHeight(); j++){
        let blockCell = shape[j][i];
        let targetCell = this.cells[block.getRow() + change.rowChange + j][block.getCol() + change.colChange + i];

        if(blockCell && targetCell){ // Block collision
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