import React from 'react';
import Block from './Block';
import Row from './Row';
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

  renderRows = () => (
    Array(C.BOARD_HEIGHT_CELLS).fill(0).map(() => <Row />)
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