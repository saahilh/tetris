import React from 'react';

class Cell extends React.Component {
  getStyle() {
    const style = {
      width: '100%',
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