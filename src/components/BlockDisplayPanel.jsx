import React from 'react';
import Cell from './Cell';

const getStyle = () => ({
  fontSize: '1.2em',
  padding: '10px',
  width: '100%',
  border: 'solid black 1px',
  fontFamily: 'Graduate',
  backgroundColor: 'black',
  fontColor: 'white',
  borderColor: 'white'
});

const getGridStyle = (blockToDisplay) => ({
  display: 'grid',
  gridTemplateRows: `repeat(2, 27px)`,
  gridTemplateColumns: blockToDisplay ? `repeat(${blockToDisplay.originalShape[0].length}, 20px)` : '80px',
  justifyContent: 'center',
  padding: '20px',
  backgroundColor: 'black',
  fontColor: 'white',
  borderColor: 'white'
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
