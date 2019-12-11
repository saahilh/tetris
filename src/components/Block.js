class Block {
  static blockTypes = ['I'];

  constructor() {
    this.x = -1;
    this.y = -1;
    this.color = 'none';
  }

  static getRandomBlock() {
    let randomBlockTypeIndex = Math.floor(Math.random() * (Block.blockTypes.length - 1));
    let blockType = Block.blockTypes[randomBlockTypeIndex];

    switch(blockType) {
      case 'I':
        return new IBlock();
      default:
        throw new Error("Block type not found")
    }
  }

  getShape() {
    return 'undefined';
  }
}

class IBlock extends Block {
  constructor() {
    super();
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