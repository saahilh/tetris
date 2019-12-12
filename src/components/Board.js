import React from 'react';
import Cell from './Cell';
import Block from './Block';
import * as C from '../constants';

class Board extends React.Component {
  componentDidMount() {
    this.setState({
      ticker: setInterval(() => this.update(), 1000),
      nextBlock: Block.getRandomBlock(),
      currentBlock: Block.getRandomBlock()
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.ticker);
  }

  update() {
    this.state.currentBlock.moveDown();
  }
  
  getStyle = () => ({
    display: 'grid',
    gridTemplateRows: `repeat(${C.BOARD_HEIGHT_CELLS}, 25px)`,
    gridTemplateColumns: `repeat(${C.BOARD_WIDTH_CELLS}, 25px)`
  });

  renderBoard = (boardDimensions) => (
    Array(C.BOARD_WIDTH_CELLS * C.BOARD_HEIGHT_CELLS).fill(0).map(() => <Cell />)
  );

  render () {
    return (
      <div style={this.getStyle()}>
        { this.renderBoard() }
      </div>
    );
  }
}

export default Board;