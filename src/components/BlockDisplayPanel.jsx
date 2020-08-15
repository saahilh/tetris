import React from 'react';
import Cell from './Cell';

const getStyle = () => ({
  fontSize: '2em',
  padding: '10px',
  width: '100%',
  border: 'solid black 1px',
  fontFamily: 'Graduate',
});

const getGridStyle = (blockToDisplay) => ({
  display: 'grid',
  gridTemplateRows: `repeat(2, 20px)`,
  gridTemplateColumns: blockToDisplay ? `repeat(${blockToDisplay.originalShape[0].length}, 20px)` : '80px',
  justifyContent: 'center',
  padding: '20px',
});

const Display = ({block}) => (
  !block 
    ? null
    : block.originalShape.map((row, x) => (
        row.map((cellColor, y) => (
            <Cell key={`${x},${y}`} cellColor={cellColor} />
        ))
    ))
)

const BlockDisplayContainer = ({block, label}) => (
    <div style={getStyle()}>
      <div style={{textAlign: 'center'}}>{label}</div>
      <div style={getGridStyle(block)}>
        <Display block={block} />
      </div>
    </div>
);

const BlockDisplayPanel = ({blockToDisplay, label}) => {
  if (!blockToDisplay) return (<BlockDisplayContainer label={label} />);
  
  return (<BlockDisplayContainer label={label} block={blockToDisplay} />);
};

export default BlockDisplayPanel;
