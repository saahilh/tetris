import React from 'react';
import Timer from './Timer';
import Board from './Board';

class Game extends React.Component {
  boardWidth = 10;
  boardHeight = 20;

  render () {
    return (
      <div className="game">
        <Timer />
        <Board height="20" width="10" />
      </div>
    );
  }
}

export default Game;