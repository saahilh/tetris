import React from 'react';
import Timer from './Timer';
import Score from './Score';
import Board from './Board';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      score: 0
    }
  }
  resetGame() {
    this.setState({
      score: 0
    });
  }

  getScore() {
    return this.state.score;
  }

  addScore = (score) => {
    this.setState({
      score: this.state.score + score
    });
  }

  getStyle = () => ({
    display: 'table',
    margin: '0 auto'
  });

  render () {
    return(
      <div style={this.getStyle()}>
        <Timer />
        <Score score={this.getScore()} />
        <Board addScore={this.addScore} restartGame={this.props.restartGame} />
      </div>
    );
  }
}

export default Game;