import React from 'react';
import Cell from './Cell';

class Board extends React.Component {
  width = 10;
  height = 20;
  dropRate = 1;

  renderRow(width) {
    const cells = [];

    for(let i = 0; i < width; i++){
      cells.push(<Cell />);
    }

    return cells;
  }

  renderBoard(height, width) {
    const rows = []

    for(let i = 0; i < width; i++){
      rows.push(<div class="row">{this.renderRow(width)}</div>);
    }

    return rows;
  }
  
  render () {
    return (
      <div className="board">
        { this.renderBoard(this.height, this.width) }
      </div>
    );
  }
}

export default Board;