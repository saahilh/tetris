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

  blockCanMoveDown = () => {
    let shape = this.activeBlock.getShape();

    for(let i = 0; i < shape.length; i++){
      for(let j = 0; j < shape[i].length; j++){
        if(shape[i][j]){
          let bottomOfBlock = i + this.activeBlock.getY() + 1;
          if((bottomOfBlock)===C.BOARD_HEIGHT_CELLS||this.cells[bottomOfBlock][j + this.activeBlock.getX()]){ // Block collision
            return false;
          }
        }
      }
    }
    
    return true;
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

  blockCanMoveLeft = () => {
    return true;
  }

  blockCanMoveRight = () => {
    return true;
  }

  blockCanRotate = () => {
    return true;
  }

  handleKeyDown = (keyCode) => {
    if(keyCode === 37 && this.blockCanMoveLeft()){ // Left arrow
      this.getActiveBlock().moveLeft();
    }
    else if(keyCode === 39 && this.blockCanMoveRight()){ // Right arrow
      this.getActiveBlock().moveRight();
    }
    else if(keyCode === 38 && this.blockCanRotate()){ // Up arrow
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
    let currentCells = this.cells;

    if(this.activeBlock){
      // Create copy of cells to avoid modifying current saved list
      currentCells = this.cells.map((row) => [...row]);
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