import React from 'react';
import Cell from './Cell';

class Row extends React.Component {
  renderCells(occupiedCells) {
    return occupiedCells.map((cellColor) => <Cell cellColor={cellColor}/>)
  }

  render() {
    return(
      this.renderCells(this.props.cellColorList)
    );
  }
}

export default Row;