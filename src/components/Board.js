import React from 'react';
import Block from './Block';
import Row from './Row';
import * as C from '../constants';

class Board extends React.Component {
  componentWillMount() {
    this.setState({
      ticker: setInterval(() => this.update(), 1000),
      currentBlock: Block.getRandomBlock(),
      cellColors: Array(C.BOARD_HEIGHT_CELLS).fill(Array(C.BOARD_WIDTH_CELLS).fill('white'))
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.ticker);
  }

  storeCells(block){
    let currentCells = this.state.cellColors;

    this.setState({
      cellColors: currentCells
    });
  }

  update() {
    let hasCollided = this.state.currentBlock.moveDown();

    this.storeCells(this.state.currentBlock);
    
    if(hasCollided){
      this.setState({
        currentBlock: Block.getRandomBlock()
      })
    }
  }
  
  getStyle = () => ({
    display: 'grid',
    gridTemplateRows: `repeat(${C.BOARD_HEIGHT_CELLS}, 25px)`,
    gridTemplateColumns: `repeat(${C.BOARD_WIDTH_CELLS}, 25px)`
  });

  renderRows = () => (
    this.state.cellColors.map((cellColorList) => <Row cellColorList={cellColorList} />)
  );

  render () {
    return (
      <div style={this.getStyle()}>
        { this.renderRows() }
      </div>
    );
  }
}

export default Board;