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
  
  // Returns a new copy of the cells
  getCells = () => this.cells.map((row) => [...row]);

  setCells = (cells) => {
    this.cells = cells;
  }

  // Removes a row and adds a new row to the top of the grid
  clearRow = (rowNum) => {
    this.cells.splice(rowNum, 1);
    this.cells.unshift(Array(C.BOARD_WIDTH_CELLS).fill(null));
  }

  blockCanMoveDown = (block) => this.verifyBlockMoveValid(block, {rowChange: 1});

  blockCanMoveLeft = (block) => this.verifyBlockMoveValid(block, {colChange: -1});

  blockCanMoveRight = (block) => this.verifyBlockMoveValid(block, {colChange: 1});

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

    // Shape might also be a rotated shape
    let width = shape[0].length;
    let height = shape.length;

    // Bounds verification
    if(block.getRow() + change.rowChange < 0
        || block.getRow() + height + change.rowChange > C.BOARD_HEIGHT_CELLS
        || block.getCol() + change.colChange < 0
        || block.getCol() + width + change.colChange > C.BOARD_WIDTH_CELLS
      ){
      return false;
    }

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

  // Overlays block onto view
  drawViewWithBlock = (block, view) => this.addBlockToCells(block, view);

  // Stores the input block in the grid
  storeBlock = (block) => this.addBlockToCells(block, this.cells)

  // Stores a block in the input cells
  addBlockToCells(block, cells){
    let shape = block.getShape();

    for(let i = 0; i < block.getHeight(); i++){
      for(let j = 0; j < block.getWidth(); j++){
        if(shape[i][j]){
          cells[block.getRow() + i][block.getCol() + j] = shape[i][j];
        }
      }
    }

    return cells;
  }
}

export default Grid;