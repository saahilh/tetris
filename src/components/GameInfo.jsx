import React from 'react';

const getStyle = () => ({
  display: 'flex',
  fontSize: '2em',
  padding: '10px',
  width: '100%',
  border: 'solid black 1px',
});

const GameInfo = ({heading, info}) => {
  const leftPadZeros = (numberAsString, digitsRequired) => {
    const numberOfZerosToPrepend = digitsRequired - numberAsString.length;
    const updatedNumberAsString = '0'.repeat(numberOfZerosToPrepend) + numberAsString;
    return updatedNumberAsString;
  };

  return(
    <div style={getStyle()}>
      <span style={{width: '100%'}}>
        <span style={{float: 'left'}}>{heading}:</span>
        <span style={{float: 'right'}}>{leftPadZeros(info, 5)}</span>
      </span>
    </div>
  );
};

export default GameInfo;
