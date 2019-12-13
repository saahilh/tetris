import * as C from '../constants';

class Block {
  constructor(startCoordinates) {
    this.x = C.BLOCK_START_COORDINATES.x;
    this.y = C.BLOCK_START_COORDINATES.y;
    this.color = 'white';
    this.collided = false;
    this.orientation = 0;
  }

  getShape = () => 'undefined';

  hasCollided = () => this.collided;

  updateCoordinates(coordinates) {
    let xIsInBounds = (!coordinates.x) || (coordinates.x >= 0 && (coordinates.x  + this.getShape()[0].length <= C.BOARD_WIDTH_CELLS));
    let yIsInBounds = (!coordinates.y) || (coordinates.y >= 0 && (coordinates.y + this.getShape().length <= C.BOARD_HEIGHT_CELLS));

    if(coordinates.x && xIsInBounds){
      this.x = coordinates.x;
    }

    if(coordinates.y && yIsInBounds){
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
      case 'L':
        return new LBlock(startCoordinates);
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

class LBlock extends Block {
  constructor(startCoordinates) {
    super(startCoordinates);
    this.color = 'blue';
  }
  
  getShape = () => ([
    [this.color],
    [this.color],
    [this.color, this.color]
  ]);
}

export default Block;