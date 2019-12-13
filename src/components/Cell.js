import React from 'react';

class Cell extends React.Component {
  getStyle = () => ({
    width: '100%',
    height: '50px',
    border: 'solid 1px black',
    backgroundColor: 'grey'
  });
  
  render() {
    return(
      <div className="cell" style={this.getStyle(this.props.isOccupied)}></div>
    );
  }
}

export default Cell;