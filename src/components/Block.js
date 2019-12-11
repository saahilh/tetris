class Block {
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

class LBlock extends Block {
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