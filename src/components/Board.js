import React from 'react';
import Row from './Row';

class Board extends React.Component {
  getStyle(height) {
    const style = {
      display: 'grid',
      gridTemplateRows: `repeat(${height}, 1fr)`
    }

    return style;
  }

  renderBoard(height, width) {
    return Array(height).fill(0).map(() => <Row width={width} />);
  }
  
  render () {
    return (
      <div style={this.getStyle(this.props.height)}>
        { this.renderBoard(this.props.height, this.props.width) }
      </div>
    );
  }
}

export default Board;