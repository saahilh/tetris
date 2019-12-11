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
    const rows = []

    for(let i = 0; i < height; i++){
      rows.push(<Row width={width} />);
    }

    return rows;
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