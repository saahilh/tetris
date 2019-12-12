import React from 'react';

class Cell extends React.Component {
  getStyle = () => ({
    width: '100%',
    height: '50px',
    border: 'solid 1px black'
  });
  
  render() {
    return(
      <div class="cell" style={this.getStyle()}></div>
    );
  }
}

export default Cell;