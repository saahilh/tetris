import React from 'react';
import Block from './Block';
import Row from './Row';
import * as C from '../constants';
import Grid from './Grid';

class Board extends React.Component {
  generateBoardCells() {
    let cells = Array(C.BOARD_HEIGHT_CELLS);

    for(let i = 0; i < C.BOARD_HEIGHT_CELLS; i++){
      cells[i] = Array(C.BOARD_WIDTH_CELLS).fill(null);
    }

    return cells;
  }

  setCurrentBlockPosition(currentBlock) {
    this.setState({
      currentBlockPosition: {
        x: currentBlock.getX(),
        y: currentBlock.getY()
      }
    });
  }

  componentWillMount() {
    let nextBlock = Block.getRandomBlock();
    let grid = new Grid();

    this.setState({
      ticker: setInterval(() => this.update(), 1000),
      currentBlock: nextBlock,
      cellColors: grid.getAsArray()
    });

    this.setCurrentBlockPosition(nextBlock);
  }

  componentDidMount() {
    this.update();
  }

  componentWillUnmount() {
    clearInterval(this.state.ticker);
  }

  blockDrawCausesCollision(currentBlock) {
    let x = currentBlock.getX();
    let y = currentBlock.getY();
    
    let shape = currentBlock.getShape();
    let currentCells = this.state.cellColors;

    for(let j = x; j < x + shape[shape.length - 1].length; j++){
      if(currentCells[y + shape.length - 1][j] && shape[shape.length - 1][j-x]){
        return true;
      }
    }

    return false;
  }

  undrawBlock(currentBlock, blockPosition){
    let x = blockPosition.x;
    let y = blockPosition.y;
    
    let shape = currentBlock.getShape();
    let currentCells = this.state.cellColors;

    for(let i = y; i < y + shape.length; i++){
      for(let j = x; j < x + shape[i-y].length; j++){
        if(shape[i-y][j-x]){ 
          currentCells[i][j] = null;
        }
      }
    }
    
    this.setState({
      cellColors: currentCells
    });
  }

  drawBlock(currentBlock){
    let x = currentBlock.getX();
    let y = currentBlock.getY();
    
    let shape = currentBlock.getShape();
    let currentCells = this.state.cellColors;

    for(let i = y; i < y + shape.length; i++){
      for(let j = x; j < x + shape[i-y].length; j++){
        if(shape[i-y][j-x]){
          currentCells[i][j] = shape[i-y][j-x];
        }
      }
    }
    
    this.setState({
      cellColors: currentCells
    });
  }

  update() {
    if(!this.state.currentBlock.isDrawn()){
      this.drawBlock(this.state.currentBlock);
      this.state.currentBlock.setDrawn();
    }
    else{
      let hasCollided = this.state.currentBlock.moveDown();
      hasCollided = hasCollided || this.blockDrawCausesCollision(this.state.currentBlock);

      if(hasCollided){
        let nextBlock = Block.getRandomBlock();
        
        this.setState({
          currentBlock: nextBlock
        });

        this.setCurrentBlockPosition(nextBlock);
      }
      else{
        this.undrawBlock(this.state.currentBlock, this.state.currentBlockPosition);
        this.drawBlock(this.state.currentBlock);
        this.setCurrentBlockPosition(this.state.currentBlock);
      }
    }
  }
  
  getStyle = () => ({
    display: 'grid',
    gridTemplateRows: `repeat(${C.BOARD_HEIGHT_CELLS}, 25px)`,
    gridTemplateColumns: `repeat(${C.BOARD_WIDTH_CELLS}, 25px)`
  });

  renderRows = () => {
    return this.state.cellColors.map((cellColorList) => <Row cellColorList={cellColorList} />)
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