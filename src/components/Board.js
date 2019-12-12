import React from 'react';
import Cell from './Cell';
import Block from './Block';

class Board extends React.Component {
  static height = 20;
  static width = 10;

  getTickRate = () => 1;

  getStyle = (boardDimensions) => ({
    display: 'grid',
    gridTemplateRows: `repeat(${boardDimensions.height}, 25px)`,
    gridTemplateColumns: `repeat(${boardDimensions.width}, 25px)`
  });

  getBoardDimensions = () => ({
    height: Board.height,
    width: Board.width
  });

  getBlockStartCoordinates = () => ({
    x: 0,
    y: Board.width/2 - 1
  });

  renderBoard = (boardDimensions) => (
    Array(boardDimensions.height * boardDimensions.width).fill(0).map(() => <Cell />)
  );

  setNewBlock() {
    this.setState({
      currentBlock: Block.getRandomBlock(this.getBlockStartCoordinates())
    });
  }

  componentDidMount() {
    this.setNewBlock();

    this.setState({
      ticker: setInterval(() => this.update(), this.getTickRate() * 1000),
      nextBlock: Block.getRandomBlock(this.getBlockStartCoordinates())
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.ticker);
  }

  update() {
    this.state.currentBlock.moveDown();
  }
  
  render () {
    return (
      <div style={this.getStyle(this.getBoardDimensions())}>
        { this.renderBoard(this.getBoardDimensions()) }
      </div>
    );
  }
}

export default Board;