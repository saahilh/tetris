import React from 'react';
import Cell from './Cell';
import * as C from '../constants'

class Row extends React.Component {
  renderCells() {
    return Array(C.BOARD_WIDTH_CELLS).fill(0).map(() => <Cell />)
  }

  render() {
    return(
      this.renderCells()
    );
  }
}

export default Row;