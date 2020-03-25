import React, {useState} from 'react';
import Game from './Game';

function Tetris(props) {
  const [newGame, setnewGame] = useState(false);

  return(
    <Game key={newGame} restartGame={() => setnewGame(prev => !prev)} />
  );
}

export default Tetris;
