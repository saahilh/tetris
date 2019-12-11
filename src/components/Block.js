class Block {
  blockTypes = ['I']

  constructor() {
    this.x = -1;
    this.y = -1;
    this.color = 'none';
  }

  static getRandomBlock() {
    return '';
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