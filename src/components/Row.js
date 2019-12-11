import React from 'react';
import Cell from './Cell';

class Row extends React.Component {
  getStyle(width) {
    const style = {
      display: 'grid',
      gridTemplateColumns: `repeat(${width}, 1fr)`
    }

    return style;
  }

  renderRow(width) {
    const cells = [];

    for(let i = 0; i < width; i++){
      cells.push(<Cell />);
    }

    return cells;
  }

  render() {
    return (
      <div style={this.getStyle(this.props.width)}>
        {this.renderRow(this.props.width)}
      </div>
    );
  }
}

export default Row;