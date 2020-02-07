import React, {useState} from 'react';
import GameInfo from './GameInfo';
import Timer from './Timer';
import Board from './Board';

function Game() {
  const [score, setScore] = useState(0);
  const [newGame, setnewGame] = useState(false);

  const restartGame = () => setnewGame(prev => !prev);

  const gameOver = () => {
    alert(`Game over! Score was ${score}`);
    restartGame();
  }

  return(
    <div key={newGame} style={{display: 'flex', margin: '50px'}}>
      <Board 
        addScore={score => setScore(prev => prev + score)} 
        restartGame={restartGame}
        gameOver={gameOver}
      />
      <div style={{paddingLeft: '10px'}}>
        <Timer />
        <GameInfo heading="Score" info={`${score}`} />
      </div>
    </div>
  );
}

export default Game;
