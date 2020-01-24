import React from 'react';

const getStyle = cellColor => ({
  border: 'solid 1px black',
  backgroundColor: cellColor
});

export default (props) => <div className="cell" style={getStyle(props.cellColor)} />;
