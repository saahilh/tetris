import React, {useState} from 'react';
import GameInfo from './GameInfo';
import Timer from './Timer';
import Board from './Board';
import NextBlockPanel from './NextBlockPanel';

function Game() {
  const [score, setScore] = useState(0);
  const [newGame, setNewGame] = useState(false);
  const [nextBlock, setNextBlock] = useState(null);

  const restartGame = () => {
    setNewGame(prev => !prev);
  };

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

  const updateNextBlock = (nextBlock) => {
    setNextBlock(nextBlock);
  };

  return(
    <div style={getGameContainerStyle()}>
      <h1 style={{textAlign: 'center', color: 'white', fontSize: 80, margin: 0, fontFamily: 'Bungee Shade'}}>TETRIS</h1>

      <div key={newGame} style={getGameStyle()}>
        <Board 
          updateNextBlock={updateNextBlock}
          addScore={score => setScore(prev => prev + score)} 
          restartGame={restartGame}
          gameOver={gameOver}
        />
        <div style={{paddingLeft: '10px'}}>
          <Timer />
          <GameInfo heading="Score" info={`${score}`} />
          <NextBlockPanel nextBlock={nextBlock} />
        </div>
      </div>
    </div>
  );
}

export default Game;
