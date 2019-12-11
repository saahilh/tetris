import React from 'react';
import Timer from './Timer';
import Board from './Board';

class Game extends React.Component {
  render () {
    return (
      <div className="game">
        <Timer />
        <Board />
      </div>
    );
  }
}

export default Game;