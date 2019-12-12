import Board from './Board';
import * as C from '../constants';

class Block {
  static blockTypes = ['I'];

  constructor(startCoordinates) {
    this.x = C.BLOCK_START_COORDINATES.x;
    this.y = C.BLOCK_START_COORDINATES.y;
    this.color = 'none';
    this.collided = false;
  }

  getShape = () => 'undefined';

  hasCollided = () => this.collided;

  updateCoordinates(coordinates) {
    this.x = coordinates.x;
    this.y = coordinates.y;
  }

  static getRandomBlock(startCoordinates) {
    let randomBlockTypeIndex = Math.floor(Math.random() * (Block.blockTypes.length - 1));
    let blockType = Block.blockTypes[randomBlockTypeIndex];

    switch(blockType) {
      case 'I':
        return new IBlock(startCoordinates);
      default:
        throw new Error("Block type not found")
    }
  }

  moveLeft() {
    if(this.x >= 0) {
      this.x = this.x - 1;
    }
  }

  moveRight() {
    if(this.y <= Board.width) {
      this.x = this.x + 1;
    }
  }

  moveDown() {
    if(this.y < Board.height) {
      this.y = this.y + 1;
      return true;
    }

    return false;
  }
}

class IBlock extends Block {
  constructor(startCoordinates) {
    super(startCoordinates);
    this.color = 'green';
  }
  
  getShape = () => ([
    [this.color],
    [this.color],
    [this.color],
    [this.color]
  ]);
}

export default Block;