import * as C from '../constants';

class Block {
  constructor(startCoordinates) {
    this.col = C.BLOCK_START_COORDINATES.col;
    this.row = C.BLOCK_START_COORDINATES.row;
    this.rotation = 0;
  }

  getShape = () => 'undefined';

  getRow = () => this.row;

  getCol = () => this.col;

  getHeight = () => this.getShape().length;

  // Assumes width is constant throughout the block! This will fail to work if a block has rows of different size.
  getWidth = () => this.getShape()[0].length;

  getColToLeftNum = () => this.getCol() - 1;

  getColToRightNum = () => this.getCol() + this.getWidth() + 1;

  getRowToBottomNum = () => this.getRow() + this.getHeight() + 1;

  canMoveLeft = () => this.col > 0;

  canMoveDown = () => this.row + this.getHeight() < C.BOARD_HEIGHT_CELLS;

  canMoveRight = () => this.col + this.getWidth() < C.BOARD_WIDTH_CELLS;

  moveLeft = () => {
    if(this.canMoveLeft()){
      this.col -= 1;
    }
  }

  moveRight = () => {
    if(this.canMoveRight()){
      this.col += 1;
    }
  }

  moveDown = () => {
    if(this.canMoveDown()){
      this.row += 1;
    }
  }

  getShape = () => this.shape;

  setShape = (shape) => {
    this.shape = shape;
  }

  getRotation = () => {
    let width = this.getWidth();
    let height = this.getHeight();

    let originalShape = this.getShape();
    let newShape = Array(width).fill(null).map(() => Array(height).fill(null));
 
    for(let i = 0; i < width; i++){
      for(let j = 0; j < height; j++){
        newShape[i][j] = originalShape[height - 1 - j][i];
      }
    }

    return newShape;
  }

  rotate = () => {
    this.setShape(this.getRotation());
  }

  static getRandomBlock(startCoordinates) {
    let randomBlockTypeIndex = Math.floor(Math.random() * C.BLOCK_TYPES.length);
    let blockType = C.BLOCK_TYPES[randomBlockTypeIndex];

    switch(blockType) {
      case 'I':
        return new IBlock(startCoordinates);
      case 'O':
        return new OBlock(startCoordinates);
      case 'L':
        return new LBlock(startCoordinates);
      case 'J':
        return new JBlock(startCoordinates);
      case 'Z':
        return new ZBlock(startCoordinates);
      case 'S':
        return new SBlock(startCoordinates);
      case 'T':
        return new TBlock(startCoordinates);
      default:
        throw new Error("Block type not found")
    }
  }
}

class IBlock extends Block {
  constructor(startCoordinates) {
    super(startCoordinates);

    this.color = 'cyan';
    this.shape = [
      [this.color, this.color, this.color, this.color]
    ];
  }
}

class OBlock extends Block {
  constructor(startCoordinates) {
    super(startCoordinates);

    this.color = 'yellow';
    this.shape = [
      [this.color, this.color],
      [this.color, this.color]
    ];

    this.col = this.col + 1;
  }
}

class LBlock extends Block {
  constructor(startCoordinates) {
    super(startCoordinates);

    this.color = 'orange';
    this.shape = [
      [null, null, this.color],
      [this.color, this.color, this.color]
    ];
  }
}

class JBlock extends Block {
  constructor(startCoordinates) {
    super(startCoordinates);

    this.color = 'blue';
    this.shape = [
      [this.color, null, null],
      [this.color, this.color, this.color]
    ];
  }
}

class ZBlock extends Block {
  constructor(startCoordinates) {
    super(startCoordinates);

    this.color = 'red';
    this.shape = [
      [this.color, this.color, null],
      [null, this.color, this.color]
    ];
  }
}

class SBlock extends Block {
  constructor(startCoordinates) {
    super(startCoordinates);

    this.color = 'green';
    this.shape = [
      [null, this.color, this.color],
      [this.color, this.color, null]
    ];
  }
}

class TBlock extends Block {
  constructor(startCoordinates) {
    super(startCoordinates);
    
    this.color = 'purple';
    this.shape = [
      [null, this.color, null],
      [this.color, this.color, this.color]
    ];
  }
}

export default Block;