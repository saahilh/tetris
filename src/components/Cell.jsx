import React from 'react';

function Cell({cellColor}) {
  return(
    <div 
      className="cell" 
      style={{
        boxShadow: cellColor && 'rgba(0, 0, 0, 0.2) 0 0 10px inset',
        backgroundColor: cellColor,
      }} 
    />
  )
}

export default Cell;
