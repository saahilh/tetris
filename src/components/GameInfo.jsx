import React from 'react';

const getStyle = () => ({
  display: 'flex',
  fontSize: '2em',
  padding: '10px',
  width: '100%',
  border: 'solid black 1px',
});

function GameInfo(props) {
  const {heading, info} = props;

  return(
    <div style={getStyle()}>
      <span style={{width: '100%'}}>{heading}: {info}</span>
    </div>
  );
}

export default GameInfo;
