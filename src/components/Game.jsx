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
  };

  const getGameContainerStyle = () => ({
    minHeight: '100vh',
    minWidth: '100vw',
    backgroundColor: 'black',
    position: 'relative',
  });

  const getGameStyle = () => ({
    display: 'flex',
    justifyContent: 'center',
    width: 'max-content',
    padding: '25px 50px',
    borderRadius: '5px',
    backgroundColor: 'white',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  });

  return(
    <div style={getGameContainerStyle()}>
      <div key={newGame} style={getGameStyle()}>
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
    </div>
  );
}

export default Game;
