import React from 'react';
import GameInfo from './GameInfo';
import Board from './Board';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      score: 0,
      startTime: this.getTime(),
      currentTime: this.getTime(),
      timer: setInterval(() => {
          this.setState({ currentTime: this.getTime() });
      }, 1000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  getTime = () => Math.floor(Date.now() / 1000);
  
  resetGame = () => {
    this.setState({
      score: 0
    });
  }

  getScore = () => {
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
    gridTemplateAreas: `"left-gutter board timer right-gutter"
                        "left-gutter board score right-gutter"
                        "left-gutter board space right-gutter"
                        "left-gutter board space right-gutter"
                       `
  });

  render () {
    return(
      <div style={this.getStyle()}>
        <GameInfo gridArea="timer" heading="Time" info={`${this.state.currentTime - this.state.startTime}`} />
        <GameInfo gridArea="score" heading="Score" info={`${this.getScore()}`} />
        <Board addScore={this.addScore} restartGame={this.props.restartGame} gameOver={this.gameOver}/>
      </div>
    );
  }
}

export default Game;