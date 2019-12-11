import React from 'react';
import Row from './Row';

class Board extends React.Component {
  height = 20;
  dropRate = 1;

  getStyle() {
    const style = {
      display: 'grid',
      gridTemplateRows: `repeat(${this.height}, 1fr)`
    }

    return style;
  }

  renderBoard() {
    const rows = []

    for(let i = 0; i < this.height; i++){
      rows.push(<Row width="10" />);
    }

    return rows;
  }
  
  render () {
    return (
      <div style={this.getStyle()}>
        { this.renderBoard() }
      </div>
    );
  }
}

export default Board;