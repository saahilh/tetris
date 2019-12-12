import React from 'react';
import Cell from './Cell';

class Board extends React.Component {
  getStyle = (boardDimensions) => ({
    display: 'grid',
    gridTemplateRows: `repeat(${boardDimensions.height}, 25px)`,
    gridTemplateColumns: `repeat(${boardDimensions.width}, 25px)`
  });

  renderBoard = (boardDimensions) => (
    Array(boardDimensions.height * boardDimensions.width).fill(0).map(() => <Cell />)
  );
  
  render () {
    return (
      <div style={this.getStyle(this.props.boardDimensions)}>
        { this.renderBoard(this.props.boardDimensions) }
      </div>
    );
  }
}

export default Board;