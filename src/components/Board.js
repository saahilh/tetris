import React from 'react';
import Block from './Block';
import Row from './Row';
import * as C from '../constants';

class Board extends React.Component {
  generateBoardCells() {
    let cells = Array(C.BOARD_HEIGHT_CELLS);

    for(let i = 0; i < C.BOARD_HEIGHT_CELLS; i++){
      cells[i] = Array(C.BOARD_WIDTH_CELLS).fill('white');
    }

    return cells;
  }

  componentWillMount() {
    this.setState({
      ticker: setInterval(() => this.update(), 1000),
      currentBlock: Block.getRandomBlock(),
      cellColors: this.generateBoardCells()
    });
  }

  componentDidMount() {
    this.update();
  }

  componentWillUnmount() {
    clearInterval(this.state.ticker);
  }

  storeCells(block){
    let currentCells = this.state.cellColors;
    let currentBlock = this.state.currentBlock;

    let shape = currentBlock.getShape();

    let x = currentBlock.getX();
    let y = currentBlock.getY();
    
    for(let i = y; i < y + shape.length; i++){
      for(let j = x; j < x + shape[i-y].length; j++){
        currentCells[i][j] = shape[i-y][j-x];
      }
    }
    
    this.setState({
      cellColors: currentCells
    });
  }

  update() {
    this.storeCells(this.state.currentBlock);

    let hasCollided = this.state.currentBlock.moveDown();

    if(hasCollided){
      this.setState({
        currentBlock: Block.getRandomBlock()
      })
    }
  }
  
  getStyle = () => ({
    display: 'grid',
    gridTemplateRows: `repeat(${C.BOARD_HEIGHT_CELLS}, 25px)`,
    gridTemplateColumns: `repeat(${C.BOARD_WIDTH_CELLS}, 25px)`
  });

  renderRows = () => {
    return this.state.cellColors.map((cellColorList) => <Row cellColorList={cellColorList} />)
  };

  render () {
    return (
      <div style={this.getStyle()}>
        { this.renderRows() }
      </div>
    );
  }
}

export default Board;