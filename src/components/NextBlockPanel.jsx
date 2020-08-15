import React from 'react';
import Cell from './Cell';

const getStyle = () => ({
  fontSize: '2em',
  padding: '10px',
  width: '100%',
  border: 'solid black 1px',
  fontFamily: 'Graduate',
});

const NextBlockPanel = ({nextBlock}) => {
  if (!nextBlock) return null;

  const getGridStyle = () => ({
    display: 'grid',
    gridTemplateRows: `repeat(${nextBlock.shape.length}, 20px)`,
    gridTemplateColumns: `repeat(${nextBlock.shape[0].length}, 20px)`,
    justifyContent: 'center',
    padding: '20px',
  });

  return(
    <div style={getStyle()}>
      <div style={{textAlign: 'center'}}>Next Block</div>
      <div style={getGridStyle()}>
        {
          nextBlock.getShape().map((row, x) => (
            row.map((cellColor, y) => (
                <Cell key={`${x},${y}`} cellColor={cellColor} />
            ))
          ))
        }
      </div>
    </div>
  );
};

export default NextBlockPanel;
