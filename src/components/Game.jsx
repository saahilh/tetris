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
  });

  const getGameStyle = () => ({
    display: 'flex',
    justifyContent: 'center',
    width: 'max-content',
    padding: '25px 50px',
    borderRadius: '5px',
    backgroundColor: 'white',
    margin: 'auto',
  });

  return(
    <div style={getGameContainerStyle()}>
      <h1 style={{textAlign: 'center', color: 'white', fontSize: 100, margin: 0, padding: 20}}>TETRIS RH</h1>

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
