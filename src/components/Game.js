import React from 'react';
import Timer from './Timer';
import Board from './Board';

class Game extends React.Component {
  tickRate = 1;

  getStyle() {
    const style = {
      padding: '50px'
    }

    return style;
  }

  boardHeight = 20;
  boardWidth = 10;

  render () {
    return (
      <div style={this.getStyle()}>
        <Timer />
        <Board height={this.boardHeight} width={this.boardWidth} />
      </div>
    );
  }
}

export default Game;