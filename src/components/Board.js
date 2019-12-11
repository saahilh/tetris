import React from 'react';
import Cell from './Cell';

class Board extends React.Component {
  getStyle(height, width) {
    const style = {
      display: 'grid',
      gridTemplateRows: `repeat(${height}, 50px)`,
      gridTemplateColumns: `repeat(${width}, 50px)`
    }

    return style;
  }

  renderBoard(height, width) {
    return Array(height * width).fill(0).map(() => <Cell />);
  }
  
  render () {
    return (
      <div style={this.getStyle(this.props.height, this.props.width)}>
        { this.renderBoard(this.props.height, this.props.width) }
      </div>
    );
  }
}

export default Board;