import React from 'react';
import Cell from './Cell';

class Board extends React.Component {
  width = 10;
  height = 20;
  dropRate = 1;

  getBoardStyle() {
    const style = {
      display: 'grid',
      gridTemplateRows: `repeat(${this.height}, 1fr)`
    }

    return style;
  }

  getRowStyle() {
    const style = {
      display: 'grid',
      gridTemplateColumns: `repeat(${this.width}, 1fr)`
    }

    return style;
  }

  renderRow() {
    const cells = [];

    for(let i = 0; i < this.width; i++){
      cells.push(<Cell />);
    }

    return cells;
  }

  renderBoard() {
    const rows = []

    for(let i = 0; i < this.height; i++){
      rows.push(<div style={this.getRowStyle()}>{ this.renderRow() }</div>);
    }

    return rows;
  }
  
  render () {
    return (
      <div style={this.getBoardStyle()}>
        { this.renderBoard() }
      </div>
    );
  }
}

export default Board;