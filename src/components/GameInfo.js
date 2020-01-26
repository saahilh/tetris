import React from 'react';

const getStyle = gridArea => ({
  fontSize: '2em',
  padding: '10px',
  width: '100%',
  border: 'solid black 1px',
  gridArea: gridArea
});

function GameInfo(props) {
  const {gridArea, heading, info} = props;

  return(
    <div style={getStyle(gridArea)}>
      <span>{heading}: </span>
      <span>{info}</span>
    </div>
  );
}

export default GameInfo;