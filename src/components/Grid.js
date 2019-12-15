import * as C from '../constants';
import Block from './Block';

class Grid {
  constructor(activeBlock) {
    this.cells = Array(C.BOARD_HEIGHT_CELLS);

    for(let i = 0; i < C.BOARD_HEIGHT_CELLS; i++){
      this.cells[i] = Array(C.BOARD_WIDTH_CELLS).fill(null);
    }

    this.activeBlock = activeBlock;
  }

  setActiveBlock(block) {
    this.activeBlock = block;
  }

  getActiveBlock = () => this.activeBlock;

  storeActiveBlock() {
    let x = this.activeBlock.getX();
    let y = this.activeBlock.getY();
    
    let shape = this.activeBlock.getShape();

    for(let i = y; i < y + shape.length; i++){
      for(let j = x; j < x + shape[i-y].length; j++){
        if(shape[i-y][j-x]){
          this.cells[i][j] = shape[i-y][j-x];
        }
      }
    }
  }

  blockCanMoveDown() {
    let currentCells = [];

    this.cells.forEach((row) => {
      currentCells.push([...row]);
    });

    let x = this.activeBlock.getX();
    let y = this.activeBlock.getY();
    
    let shape = this.activeBlock.getShape();

    for(let i = y; i < y + shape.length; i++){
      for(let j = x; j < x + shape[i-y].length; j++){
        if(shape[i-y][j-x]){
          if((i+1)===C.BOARD_HEIGHT_CELLS||currentCells[i+1][j]){ // Block collision
            return false;
          }
        }
      }
    }

    return true;
  }

  overlayBlockOntoGrid(block, grid) {
    let x = block.getX();
    let y = block.getY();
    
    let shape = block.getShape();

    for(let i = y; i < y + shape.length; i++){
      for(let j = x; j < x + shape[i-y].length; j++){
        if(shape[i-y][j-x]){
          grid[i][j] = shape[i-y][j-x];
        }
      }
    }
  }

  handleKeyDown(keyCode) {
    if(keyCode === 37){ // Left arrow
      this.getActiveBlock().moveLeft();
    }
    else if(keyCode === 39){ // Right arrow
      this.getActiveBlock().moveRight();
    }
    else if(keyCode === 38){ // Up arrow
      this.getActiveBlock().rotate();
    }
    else if(keyCode === 40){ // Down arrow
      this.update();
    }
    else if(keyCode === 32){ // Space bar
      while(this.blockCanMoveDown()){
        this.update();
      }
      this.update();
    }
  }

  getView() {
    // Create copy of cells to avoid modifying current saved list
    let currentCells = this.cells.map((row) => [...row]);

    if(this.activeBlock){
      this.overlayBlockOntoGrid(this.activeBlock, currentCells);
    }

    return currentCells;
  }

  update() {
    if(this.blockCanMoveDown()){
      this.getActiveBlock().moveDown();
    }
    else{
      this.storeActiveBlock();
      this.setActiveBlock(Block.getRandomBlock());
    }
  }
}

export default Grid;