import * as C from '../constants';

class Block {
  constructor(startCoordinates) {
    this.col = C.BLOCK_START_COORDINATES.col;
    this.row = C.BLOCK_START_COORDINATES.row;
    this.rotation = 0;
  }

  getShape = () => 'undefined';

  updateCoordinates(coordinates) {
    let xIsInBounds = (!coordinates.col) || (coordinates.col >= 0 && (coordinates.col  + this.getShape()[0].length <= C.BOARD_WIDTH_CELLS));
    let yIsInBounds = (!coordinates.row) || (coordinates.row >= 0 && (coordinates.row + this.getShape().length <= C.BOARD_HEIGHT_CELLS));

    if((coordinates.col || coordinates.col===0) && xIsInBounds){
      this.col = coordinates.col;
    }

    if((coordinates.row || coordinates.row===0) && yIsInBounds){
      this.row = coordinates.row;
    }

    return !xIsInBounds || !yIsInBounds;
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

  getColor = () => this.color;

  getRow = () => this.row;

  getCol = () => this.col;

  moveLeft = () => this.updateCoordinates({col: this.col - 1});

  moveRight = () => this.updateCoordinates({col: this.col + 1});

  moveDown = () => this.updateCoordinates({row: this.row + 1});

  moveUp = () => this.updateCoordinates({row: this.row - 1});

  getShape = () => this.shape;

  setShape = (shape) => {
    this.shape = shape;
  }

  rotate = () => {
    let originalShape = this.getShape();

    let x = originalShape[0].length;
    let y = originalShape.length;
    let newShape = Array(x);
 
    for(let j = 0; j < x; j++){
      newShape[j] = Array(y).fill(null);

      for(let k = 0; k < y; k++){
        newShape[j][k] = originalShape[y-1-k][j];
      }
    }

    this.setShape(newShape);
  }

  canMoveDown = () => {
    return this.row + this.getShape().length <= C.BOARD_HEIGHT_CELLS;
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