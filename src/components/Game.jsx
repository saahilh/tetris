import React, {useState} from 'react';
import GameInfo from './GameInfo';
import Timer from './Timer';
import Board from './Board';
import BlockDisplayPanel from './BlockDisplayPanel';

function Game() {
  const [score, setScore] = useState(0);
  const [nextBlock, setNextBlock] = useState(null);
  const [savedBlock, setSavedBlock] = useState(null);

  const [initialLoad, setInitialLoad] = useState(true);
  const [gameEnded, setGameEnded] = useState(true);

  const startFirstGame = () => {
    setInitialLoad(false);
    setGameEnded(false);
  }

  const restartGame = () => {
    setScore(0);
    setGameEnded(false);
  };

  const gameOver = () => {
    setGameEnded(true);
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

  const getGameOverStyle = () => ({
    width: 'max-content',
    padding: '25px 50px',
    borderRadius: '5px',
    backgroundColor: 'white',
    margin: 'auto',
    textAlign: 'center',
  });

  const updateNextBlock = (nextBlock) => {
    setNextBlock(nextBlock);
  };

  const updateSavedBlock = (savedBlock) => {
    setSavedBlock(savedBlock);
  };

  if (initialLoad) {
    return (
      <div style={getGameContainerStyle()}>
        <h1 style={{textAlign: 'center', color: 'white', fontSize: 80, margin: 0, fontFamily: 'Bungee Shade'}}>TETRIS</h1>
        <div style={getGameOverStyle()}>
          <h2 style={{fontFamily: 'Bungee Shade'}}>Welcome to Tetris RH</h2>
          <button onClick={startFirstGame}>Start Game</button>
        </div>
      </div>
    );
  }

  if (gameEnded) {
    return (
      <div style={getGameContainerStyle()}>
        <h1 style={{textAlign: 'center', color: 'white', fontSize: 80, margin: 0, fontFamily: 'Bungee Shade'}}>TETRIS</h1>
        <div style={getGameOverStyle()}>
          <h2 style={{fontFamily: 'Bungee Shade'}}>Game Over</h2>
          <h3 style={{fontFamily: 'Graduate'}}>Score was {score}</h3>
          <button onClick={restartGame}>Restart</button>
        </div>
      </div>
    );
  }

  return (
    <div style={getGameContainerStyle()}>
      <h1 style={{textAlign: 'center', color: 'white', fontSize: 80, margin: 0, fontFamily: 'Bungee Shade'}}>TETRIS</h1>

      <div style={getGameStyle()}>
        <Board 
          updateNextBlock={updateNextBlock}
          updateSavedBlock={updateSavedBlock}
          addScore={score => setScore(prev => prev + score)} 
          restartGame={restartGame}
          gameOver={gameOver}
        />
        <div style={{paddingLeft: '10px'}}>
          <Timer />
          <GameInfo heading="Score" info={`${score}`} />
          <BlockDisplayPanel label="Next Block" blockToDisplay={nextBlock} />
          <BlockDisplayPanel label="Held Block" blockToDisplay={savedBlock} />
        </div>
      </div>
    </div>
  );
}

export default Game;
