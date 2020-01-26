import React, {useState} from 'react';
import GameInfo from './GameInfo';
import Timer from './Timer';
import Board from './Board';

function Game(props) {
  const {restartGame} = props;
  const [score, setScore] = useState(0);

  const gameOver = () => {
    alert(`Game over! Score was ${score}`);
    props.restartGame();
  }

  return(
    <div style={{display: 'flex', margin: '50px'}}>
      <Board 
        addScore={score => setScore(prev => prev + score)} 
        restartGame={restartGame} 
        gameOver={gameOver}
      />
      <div style={{paddingLeft: '10px'}}>
        <Timer startTime={Math.floor(Date.now() / 1000)} />
        <GameInfo gridArea="score" heading="Score" info={`${score}`} />
      </div>
    </div>
  );
}

export default Game;
