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

  clearFilledRows = () => {
    let score = 0;

    for(let i = 0; i < C.BOARD_HEIGHT_CELLS; i++){
      let filled = true;

      for(let j = 0; j < C.BOARD_WIDTH_CELLS; j++){
        if(!this.cells[i][j]){
          filled = false;
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

  blockCanMoveDown = () => {
    let x = this.activeBlock.getX();
    let y = this.activeBlock.getY();
    
    let shape = this.activeBlock.getShape();

    for(let i = y; i < y + shape.length; i++){
      for(let j = x; j < x + shape[i-y].length; j++){
        if(shape[i-y][j-x]){
          if((i+1)===C.BOARD_HEIGHT_CELLS||this.cells[i+1][j]){ // Block collision
            return false;
          }
        }
      }
    }

    return true;
  }

  overlayBlockOntoGrid = (block, grid) => {
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

  handleKeyDown = (keyCode) => {
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

  getView = () => {
    // Create copy of cells to avoid modifying current saved list
    let currentCells = this.cells.map((row) => [...row]);

    if(this.activeBlock){
      this.overlayBlockOntoGrid(this.activeBlock, currentCells);
    }

    return currentCells;
  }

  update = () => {
    if(this.blockCanMoveDown()){
      this.getActiveBlock().moveDown();
    }
    else{
      this.storeActiveBlock();
      let scoreToAdd = this.clearFilledRows();
      this.addScore(scoreToAdd);
      this.setActiveBlock(Block.getRandomBlock());
    }
  }
}

export default Grid;