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

  update() {
    if(this.blockCanMoveDown()){
      this.getActiveBlock().moveDown();
    }
    else{
      this.storeActiveBlock();
      this.setActiveBlock(Block.getRandomBlock());
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

  getView() {
    let currentCells = [];

    this.cells.forEach((row) => {
      currentCells.push([...row]);
    });

    if(this.activeBlock){
      let x = this.activeBlock.getX();
      let y = this.activeBlock.getY();
      
      let shape = this.activeBlock.getShape();

      for(let i = y; i < y + shape.length; i++){
        for(let j = x; j < x + shape[i-y].length; j++){
          if(shape[i-y][j-x]){
            currentCells[i][j] = shape[i-y][j-x];
          }
        }
      }
    }

    return currentCells;
  }
}

export default Grid;