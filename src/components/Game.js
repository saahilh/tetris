import React, {useState} from 'react';
import GameInfo from './GameInfo';
import Timer from './Timer';
import Board from './Board';

const getStyle = () => ({
  display: 'grid',
  margin: '50px',
  gridTemplateAreas: 
      `"left-gutter board timer right-gutter"
      "left-gutter board score right-gutter"
      "left-gutter board space right-gutter"
      "left-gutter board space right-gutter"
      `
});

function Game(props) {
  const {restartGame} = props;
  const [score, setScore] = useState(0);

  const gameOver = () => {
    alert(`Game over! Score was ${score}`)
    props.restartGame();
  }

  return(
    <div style={getStyle()}>
      <Timer startTime={Math.floor(Date.now() / 1000)} />
      <GameInfo gridArea="score" heading="Score" info={`${score}`} />
      <Board 
        addScore={(score) => setScore(prev => prev + score)} 
        restartGame={restartGame} 
        gameOver={gameOver}
      />
    </div>
  );
}

export default Game;