import * as C from '../constants';

class Block {
  constructor(startCoordinates) {
    this.x = C.BLOCK_START_COORDINATES.x;
    this.y = C.BLOCK_START_COORDINATES.y;
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
}

class IBlock extends Block {
  constructor(startCoordinates) {
    super(startCoordinates);
    this.color = 'cyan';
  }
  
  getShape = () => ([
    [this.color, this.color, this.color, this.color]
  ]);
}

class OBlock extends Block {
  constructor(startCoordinates) {
    super(startCoordinates);
    this.color = 'yellow';
  }
  
  getShape = () => ([
    [null, this.color, this.color],
    [null, this.color, this.color]
  ]);
}

class LBlock extends Block {
  constructor(startCoordinates) {
    super(startCoordinates);
    this.color = 'orange';
  }
  
  getShape = () => ([
    [null, null, this.color],
    [this.color, this.color, this.color]
  ]);
}

class JBlock extends Block {
  constructor(startCoordinates) {
    super(startCoordinates);
    this.color = 'blue';
  }
  
  getShape = () => ([
    [this.color, null, null],
    [this.color, this.color, this.color]
  ]);
}

class ZBlock extends Block {
  constructor(startCoordinates) {
    super(startCoordinates);
    this.color = 'red';
  }
  
  getShape = () => ([
    [this.color, this.color, null],
    [null, this.color, this.color]
  ]);
}

class SBlock extends Block {
  constructor(startCoordinates) {
    super(startCoordinates);
    this.color = 'green';
  }
  
  getShape = () => ([
    [null, this.color, this.color],
    [this.color, this.color, null]
  ]);
}

class TBlock extends Block {
  constructor(startCoordinates) {
    super(startCoordinates);
    this.color = 'purple';
  }
  
  getShape = () => ([
    [null, this.color, null],
    [this.color, this.color, this.color]
  ]);
}

export default Block;