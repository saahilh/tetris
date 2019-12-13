import React from 'react';

class Cell extends React.Component {
  getStyle = (cellColor) => ({
    width: '100%',
    height: '50px',
    border: 'solid 1px black',
    backgroundColor: cellColor
  });
  
  render() {
    return(
      <div className="cell" style={this.getStyle(this.props.cellColor)}></div>
    );
  }
}

export default Cell;