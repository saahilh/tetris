import React, {useState} from 'react';
import GameInfo from './GameInfo';
import Board from './Board';

const getTime = () => Math.floor(Date.now() / 1000);

function Game(props) {
  const {startTime, restartGame} = props;
  const [currentTime, setCurrentTime] = useState(getTime());
  const [score, setScore] = useState(0);

  useState(() => {
    const timer = setInterval(() => {
      setCurrentTime(getTime());
    }, 1000)

    return function cleanup() {
      clearInterval(timer);
    }
  }, [])

  const addScore = () => setScore(prev => prev + 1);

  const gameOver = () => {
    alert(`Game over! Score was ${score}`)
    props.restartGame();
  }

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

  return(
    <div style={getStyle()}>
      <GameInfo gridArea="timer" heading="Time" info={`${currentTime - startTime}`} />
      <GameInfo gridArea="score" heading="Score" info={`${score}`} />
      <Board addScore={addScore} restartGame={restartGame} gameOver={gameOver}/>
    </div>
  );
}

export default Game;