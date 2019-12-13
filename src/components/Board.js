import React from 'react';
import Block from './Block';
import Row from './Row';
import * as C from '../constants';

class Board extends React.Component {
  componentWillMount() {
    this.setState({
      ticker: setInterval(() => this.update(), 1000),
      nextBlock: Block.getRandomBlock(),
      currentBlock: Block.getRandomBlock(),
      cells: Array(C.BOARD_HEIGHT_CELLS).fill(Array(C.BOARD_WIDTH_CELLS).fill(false))
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.ticker);
  }

  storeCells(block){
    let currentCells = this.state.cells;

    this.setState({
      cells: currentCells
    });
  }

  update() {
    let hasCollided = this.state.currentBlock.moveDown();

    if(hasCollided){
      this.storeCells(this.state.currentBlock)
    }
  }
  
  getStyle = () => ({
    display: 'grid',
    gridTemplateRows: `repeat(${C.BOARD_HEIGHT_CELLS}, 25px)`,
    gridTemplateColumns: `repeat(${C.BOARD_WIDTH_CELLS}, 25px)`
  });

  renderRows = () => (
    this.state.cells.map((elementList) => <Row occupiedCells={elementList} />)
  );

  render () {
    return (
      <div style={this.getStyle()}>
        { this.renderRows() }
      </div>
    );
  }
}

export default Board;