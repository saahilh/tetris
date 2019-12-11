import React from 'react';
import Cell from './Cell';

class Row extends React.Component {
  getStyle(width) {
    const style = {
      display: 'grid',
      gridTemplateColumns: `repeat(${width}, 50px)`
    }

    return style;
  }

  renderRow(width) {
    return Array(width).fill(0).map(() => <Cell />);
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