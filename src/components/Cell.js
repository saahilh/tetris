import React from 'react';

const getStyle = cellColor => ({
  border: 'solid 1px black',
  backgroundColor: cellColor
});

class Cell extends React.Component {
  render() {
    return(
      <div className="cell" style={getStyle(this.props.cellColor)}></div>
    );
  }
}

export default Cell;