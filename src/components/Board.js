import React from 'react';
import Block from './Block';
import Cell from './Cell';
import * as C from '../constants';
import Grid from './Grid';

class Board extends React.Component {
  constructor(props) {
    super(props);

    let grid = new Grid(Block.getRandomBlock(), this.props.addScore);

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
    return this.state.gridView.map(
      (cellColorList) => cellColorList.map((cellColor) => <Cell cellColor={cellColor}/>)
    );
  }

  handleKeyDown = (event) => {
    this.state.grid.handleKeyDown(event.keyCode);
    
    this.redraw();
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