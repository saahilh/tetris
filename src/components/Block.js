import * as C from '../constants';

class Block {
  constructor(startCoordinates) {
    this.x = C.BLOCK_START_COORDINATES.x;
    this.y = C.BLOCK_START_COORDINATES.y;
    this.rotation = 0;
  }

  getShape = () => 'undefined';

  updateCoordinates(coordinates) {
    let xIsInBounds = (!coordinates.x) || (coordinates.x >= 0 && (coordinates.x  + this.getShape()[0].length <= C.BOARD_WIDTH_CELLS));
    let yIsInBounds = (!coordinates.y) || (coordinates.y >= 0 && (coordinates.y + this.getShape().length <= C.BOARD_HEIGHT_CELLS));

    if((coordinates.x || coordinates.x===0) && xIsInBounds){
      this.x = coordinates.x;
    }

    if((coordinates.y || coordinates.y===0) && yIsInBounds){
      this.y = coordinates.y;
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

  getX = () => this.x;

  getY = () => this.y;

  moveLeft = () => this.updateCoordinates({x: this.x - 1});

  moveRight = () => this.updateCoordinates({x: this.x + 1});

  moveDown = () => this.updateCoordinates({y: this.y + 1});

  moveUp = () => this.updateCoordinates({y: this.y - 1});

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
        newShape[j][k] = originalShape[k][y-j];
      }
    }
    alert(newShape);
    this.setShape(newShape);
  }

  canMoveDown = () => {
    return this.y + this.getShape().length <= C.BOARD_HEIGHT_CELLS;
  }
}

class IBlock extends Block {
  constructor(startCoordinates) {
    super(startCoordinates);
    this.color = 'cyan';
    this.shape = [[this.color, this.color, this.color, this.color]];
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

    this.x = this.x + 1;
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