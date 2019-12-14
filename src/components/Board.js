import React from 'react';
import Block from './Block';
import Row from './Row';
import * as C from '../constants';
import Grid from './Grid';

class Board extends React.Component {
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
      grid: grid,
      gridView: grid.getView()
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
    let currentCells = this.state.gridView;

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
    let currentCells = this.state.gridView;

    for(let i = y; i < y + shape.length; i++){
      for(let j = x; j < x + shape[i-y].length; j++){
        if(shape[i-y][j-x]){ 
          currentCells[i][j] = null;
        }
      }
    }
    
    this.setState({
      gridView: currentCells
    });
  }

  drawBlock(currentBlock){
    this.state.grid.setActiveBlock(currentBlock);
    
    this.setState({
      gridView: this.state.grid.getView()
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