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

  getWidth = () => this.getShape()[0].length;

  canMoveLeft = () => this.col > 0;

  canMoveDown = () => this.row + this.getHeight() < C.BOARD_HEIGHT_CELLS - 1;

  canMoveRight = () => this.col + this.getWidth() < C.BOARD_WIDTH_CELLS - 1;

  moveLeft = () => {
    if(this.canMoveLeft()){
      this.col -= 1;
    }
  }

  moveRow = () => {
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

  rotate = () => {
    let originalShape = this.getShape();

    let width = originalShape[0].length;
    let height = originalShape.length;

    let newShape = Array(width);
 
    for(let i = 0; i < width; i++){
      newShape[i] = Array(height).fill(null);

      for(let j = 0; j < height; j++){
        newShape[i][j] = originalShape[height - 1 - j][i];
      }
    }

    this.setShape(newShape);
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