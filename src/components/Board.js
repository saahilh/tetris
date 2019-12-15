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
    this.stopTicker();
  }

  startTicker() {
    this.setState({
      ticker: setInterval(() => this.update(), 1000)
    });
  }

  stopTicker() {
    clearInterval(this.state.ticker);
  }

  redraw() {
    this.setState({
      gridView: this.state.grid.getView()
    });
  }

  update() {
    this.redraw();
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

  handleKeyDown = (event) => {
    this.stopTicker();

    this.state.grid.handleKeyDown(event.keyCode);
    
    this.redraw();

    this.startTicker();
  }

  render () {
    return (
      <div tabIndex="0" style={this.getStyle()} onKeyDown={this.handleKeyDown}>
        { this.renderRows() }
      </div>
    );
  }
}

export default Board;