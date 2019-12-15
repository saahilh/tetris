import React from 'react';
import Game from './Game';

class Tetris extends React.Component {
  constructor() {
    // Used to set key for game to create a new game
    // instance when updated; a bit of a weird way
    // to do it but the only way I can find to do so
    // using React right now.
    super()

    this.state = {
      gameInstanceNumber: 0
    }
  }

  restartGame = () => {
    this.setState({
      gameInstanceNumber: this.state.gameInstanceNumber + 1
    });
  }

  render () {
    return(
      <Game key={this.state.gameInstanceNumber} restartGame={this.restartGame} />
    );
  }
}

export default Tetris;