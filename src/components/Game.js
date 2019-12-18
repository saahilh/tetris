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

  gameOver = () => {
    alert(`Game over! Score was ${this.state.score}`)
    this.props.restartGame();
  }

  getStyle = () => ({
    display: 'grid',
    margin: '50px',
    gridTemplateAreas: `"left-gutter board board timer right-gutter"
                        "left-gutter board board score right-gutter"
                        "left-gutter board board space right-gutter"
                        "left-gutter board board space right-gutter"
                       `
  });

  render () {
    return(
      <div style={this.getStyle()}>
        <Timer />
        <Score score={this.getScore()} />
        <Board addScore={this.addScore} restartGame={this.props.restartGame} gameOver={this.gameOver}/>
      </div>
    );
  }
}

export default Game;