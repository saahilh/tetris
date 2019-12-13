import React from 'react';
import Timer from './Timer';
import Board from './Board';

class Game extends React.Component {
  getStyle = () => ({
    display: 'table',
    margin: '0 auto'
  });

  render () {
    return(
      <div style={this.getStyle()}>
        <Timer />
        <Board />
      </div>
    );
  }
}

export default Game;