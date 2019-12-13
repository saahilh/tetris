import React from 'react';
import Cell from './Cell';

class Row extends React.Component {
  renderCells(occupiedCells) {
    return occupiedCells.map((isOccupied) => <Cell occupied={isOccupied}/>)
  }

  render() {
    return(
      this.renderCells(this.props.occupiedCells)
    );
  }
}

export default Row;