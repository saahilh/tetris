import React, {useState} from 'react';
import GameInfo from './GameInfo';
import Timer from './Timer';
import Board from './Board';
import BlockDisplayPanel from './BlockDisplayPanel';
import Autofocus from './Autofocus';

function Game() {
  const [score, setScore] = useState(0);
  const [highscore, setHighscore] = useState(0);

  const [nextBlock, setNextBlock] = useState(null);
  const [savedBlock, setSavedBlock] = useState(null);

  const [initialLoad, setInitialLoad] = useState(true);
  const [gameEnded, setGameEnded] = useState(true);

  const [restartKey, setRestartKey] = useState(false);

  const startNewGame = () => {
    setScore(0);
    setNextBlock(null);
    setSavedBlock(null);
    setInitialLoad(false);
    setGameEnded(false);
  };

  const gameOver = () => {
    setGameEnded(true);
  };

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
  
  const handleKeyDown = (event) => {
    let keyCode = event.keyCode;

    if(keyCode === 82){ // r key
      startNewGame();
    }
  };

  if (initialLoad) {
    return (
      <Autofocus onKeyDown={handleKeyDown}>
        <div style={getGameOverStyle()}>
          <h2 style={{fontFamily: 'Bungee Shade'}}>Welcome to Tetris RH</h2>
          <button onClick={startNewGame}>Start Game</button>
        </div>
      </Autofocus>
    );
  }

  const restartGame = () => {
    setScore(0);
    setRestartKey(prev => !prev);
  };


  if (gameEnded) {
    return (
      <Autofocus onKeyDown={handleKeyDown}>
        <div style={getGameOverStyle()}>
          <h2 style={{fontFamily: 'Bungee Shade'}}>Game Over</h2>
          <h3 style={{fontFamily: 'Graduate'}}>Score: {score}</h3>
          <h3 style={{fontFamily: 'Graduate'}}>High Score: {highscore}</h3>
          <button onClick={startNewGame}>Restart (r)</button>
        </div>
      </Autofocus>
    );
  }

  const addScore = additionalScore => {
    setScore(prevScore => {
      const updatedScore = prevScore + additionalScore;
      setHighscore(prevHighscore => Math.max(prevHighscore, updatedScore));
      return updatedScore;
    });
  };

  return (
    <>
      <div key={restartKey} style={getGameStyle()}>
        <Board 
          updateNextBlock={updateNextBlock}
          updateSavedBlock={updateSavedBlock}
          addScore={addScore} 
          restartGame={restartGame}
          gameOver={gameOver}
        />
        <div style={{paddingLeft: '10px'}}>
          <Timer />
          <GameInfo heading="Score" info={`${score}`} />
          <GameInfo heading="High Score" info={`${highscore}`} />
          <BlockDisplayPanel label="Next Block" blockToDisplay={nextBlock} />
          <BlockDisplayPanel label="Held Block" blockToDisplay={savedBlock} />
        </div>
      </div>
    </>
  );
}

export default Game;
