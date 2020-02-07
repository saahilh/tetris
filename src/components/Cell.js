import React from 'react';

function Cell({cellColor}) {
  return(
    <div 
      className="cell" 
      style={{
        border: 'solid 1px black',
        backgroundColor: cellColor
      }} 
    />
  )
}

export default Cell;
