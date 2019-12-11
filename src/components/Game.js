import React from 'react';
import Timer from './Timer';
import Board from './Board';
import Block from './Block';

class Game extends React.Component {
  tickRate = 1;
  boardHeight = 20;
  boardWidth = 10;

  getStyle() {
    const style = {
      padding: '50px'
    }

    return style;
  }

  getNextBlock() {
    return Block.getRandomBlock();
  }

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