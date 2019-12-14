import React from 'react';
import Block from './Block';
import Row from './Row';
import * as C from '../constants';
import Grid from './Grid';

class Board extends React.Component {
  constructor() {
    super();

    let grid = new Grid(Block.getRandomBlock());

    this.state = {
      ticker: setInterval(() => this.update(), 1000),
      grid: grid,
      gridView: grid.getView()
    };
  }

  componentDidMount() {
    this.update();
  }

  componentWillUnmount() {
    clearInterval(this.state.ticker);
  }

  update() {
    this.setState({
      gridView: this.state.grid.getView()
    });

    this.state.grid.update();
  }
  
  getStyle = () => ({
    display: 'grid',
    gridTemplateRows: `repeat(${C.BOARD_HEIGHT_CELLS}, 25px)`,
    gridTemplateColumns: `repeat(${C.BOARD_WIDTH_CELLS}, 25px)`
  });

  renderRows = () => {
    return this.state.gridView.map((cellColorList) => <Row cellColorList={cellColorList} />)
  };

  render () {
    return (
      <div style={this.getStyle()}>
        { this.renderRows() }
      </div>
    );
  }
}

export default Board;