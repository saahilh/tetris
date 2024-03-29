import React from 'react';
import Game from './Game';

function GameContainer() {
  const getGameContainerStyle = () => ({
    minHeight: '100vh',
    minWidth: '100vw',
    backgroundColor: 'black',
    color: 'white',
  });

  const getGameTitleStyle = () => ({
    textAlign: 'center',
    color: 'white',
    fontSize: 80,
    margin: 0,
    fontFamily: 'Bungee Shade',
    backgroundColor: 'black',
    color: 'white'
  });

  return(
    <div style={getGameContainerStyle()}>
      <h1 style={getGameTitleStyle()}>TETRIS</h1>
      <Game />
    </div>
  );
}

export default GameContainer;
