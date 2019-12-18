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

  // Removes a row and adds a new row to the top of the grid
  clearRow = (rowNum) => {
    this.cells.splice(rowNum, 1);
    this.cells.unshift(Array(C.BOARD_WIDTH_CELLS).fill(null));
  }

  blockCanMoveDown = (block) => {
    if(block.getBottomSideRow() + 1 > C.BOARD_HEIGHT_CELLS){
      return false;
    }

    return this.verifyBlockMoveValid(block, {rowChange: 1});
  }

  blockCanMoveLeft = (block) => {
    if(block.getLeftSideCol() - 1 < 0){
      return false;
    }

    return this.verifyBlockMoveValid(block, {colChange: -1});
  }

  blockCanMoveRight = (block) => {
    if(block.getRightSideCol() + 1 > C.BOARD_WIDTH_CELLS){
      return false;
    }

    return this.verifyBlockMoveValid(block, {colChange: 1});
  }

  blockCanRotate = (block) => this.verifyBlockMoveValid(block, {}, block.getRotation());
     
  /** 
   *  Sweeps over an area to verify a block can be moved into that area
   *      rowChange: new target row position relative to current row position
   *        positive = downwards, negative = upwards
   *      colChange: new target col position relative to current col position
   *        positive = right, negative = left
   */
  verifyBlockMoveValid = (block, change = {}, shape = block.getShape()) => {
    let defaultChange = {rowChange: 0, colChange: 0};
    change = {...defaultChange, ...change};

    let width = shape[0].length;
    let height = shape.length;

    for(let i = 0; i < width; i++){
      for(let j = 0; j < height; j++){
        let blockCell = shape[j][i];
        let targetCell = this.cells[block.getRow() + change.rowChange + j][block.getCol() + change.colChange + i];

        if(blockCell && targetCell){ // Block collision
          return false;
        }
      }
    }

    return true;
  }

  getView = () => this.cells.map((row) => [...row]);

  // Overlays block onto view and returns the result as a new grid rather than as a reference
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

  // Stores the input block in the grid
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