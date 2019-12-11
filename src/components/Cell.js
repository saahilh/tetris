import React from 'react';

class Cell extends React.Component {
  getStyle() {
    const style = {
      width: '50px',
      height: '50px',
      border: 'solid 1px black'
    }

    return style;
  }

  render() {
    return(
      <div class="cell" style={this.getStyle()}>I'm a cell</div>
    );
  }
}

export default Cell;