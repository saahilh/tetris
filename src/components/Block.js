class Block {
  static blockTypes = ['I'];

  constructor(startCoordinates) {
    this.x = startCoordinates.x;
    this.y = startCoordinates.y;
    this.color = 'none';
    this.collided = false;
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

  getShape() {
    return 'undefined';
  }

  hasCollided() {
    return this.collided;
  }

  updateCoordinates(x, y) {
    this.x = x;
    this.y = y;
  }
}

class IBlock extends Block {
  constructor(startCoordinates) {
    super(startCoordinates);
    this.color = 'green';
  }
  
  getShape() {
    return [
      [this.color],
      [this.color],
      [this.color],
      [this.color]
    ];
  }
}

export default Block;