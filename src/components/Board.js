import React from 'react';
import Block from './Block';
import Cell from './Cell';
import * as C from '../constants';
import Grid from './Grid';

class Board extends React.Component {
  constructor(props) {
    super(props);

    let grid = new Grid(this.props.addScore);

    this.state = {
      ticker: setInterval(() => this.update(), 1000),
      grid: grid,
      gridView: grid.getCells(),
      activeBlock: Block.getRandomBlock()
    };

    this.setNewNextBlock();
  }

  getActiveBlock = () => this.state.activeBlock;

  setActiveBlock = (block) => {
    this.setState({
      activeBlock: block
    });
  }

  componentDidMount = () => this.update();

  componentWillUnmount = () => clearInterval(this.state.ticker);

  redraw = (showBlock = true) => {
    if(showBlock){
      this.setState({
        gridView: Grid.addBlockToCells(this.getActiveBlock(), this.state.grid.getCells())
      });
    }
    else{
      this.setState({
        gridView: this.state.grid.getCells()
      });
    }
  }

  update = () => {
    this.redraw();

    let grid = this.state.grid;

    if(grid.blockCanMoveDown(this.getActiveBlock())){
      this.getActiveBlock().moveDown();
    }
    else{
      grid.storeBlock(this.getActiveBlock());
      let scoreToAdd = this.clearFilledRows();
      grid.addScore(scoreToAdd);
      this.redraw(false);

      let nextBlock = this.consumeNextBlock();
      this.setActiveBlock(nextBlock);
      
      if(grid.blockOverlapsGrid(nextBlock)){
        this.props.gameOver();
      }
    }
  }

  clearFilledRows = () => {
    let grid = this.state.grid;
    let score = 0;

    for(let i = 0; i < C.BOARD_HEIGHT_CELLS; i++){
      let filled = true;

      for(let j = 0; j < C.BOARD_WIDTH_CELLS; j++){
        if(!grid.getCell(i, j)){
          filled = false;
          break;
        }
      }

      if(filled){
        grid.clearRow(i);
        score += 1;
      }
    }

    return score;
  }

  getSavedBlock = () => this.state.savedBlock;

  getNextBlock = () => this.state.nextBlock;

  setNewNextBlock = () => {
    this.setState({
      nextBlock: Block.getRandomBlock()
    });
  }

  consumeNextBlock = () => {
    let nextBlock = this.getNextBlock();
    this.setNewNextBlock();
    return nextBlock;
  }

  swapSavedBlock = () => {
    let newActiveBlock = this.getSavedBlock() ? this.getSavedBlock() : this.consumeNextBlock();
    let newSavedBlock = this.getActiveBlock();

    this.setState({
      activeBlock: newActiveBlock,
      savedBlock: newSavedBlock
    });

    newActiveBlock.resetPosition();
    newSavedBlock.resetPosition();
  }

  handleKeyDown = (event) => {
    let keyCode = event.keyCode; 
    let grid = this.state.grid;

    if(keyCode === 82){ // r key
      this.props.restartGame();
    }
    else if(keyCode === 32){ // Space bar
      while(grid.blockCanMoveDown(this.getActiveBlock())){
        this.update();
      }
      
      this.update();
    }
    else if(keyCode === 40){ // Down arrow
      this.update();
    }
    else{
      if(keyCode === 37 && grid.blockCanMoveLeft(this.getActiveBlock())){ // Left arrow
        this.getActiveBlock().moveLeft();
      }
      else if(keyCode === 39 && grid.blockCanMoveRight(this.getActiveBlock())){ // Right arrow
        this.getActiveBlock().moveRight();
      }
      else if(keyCode === 38 && grid.blockCanRotate(this.getActiveBlock())){ // Up arrow
        this.getActiveBlock().rotate();
      }
      else if(keyCode === 16){ // Shift key
        this.swapSavedBlock();
      }
      
      this.redraw();
    }
  }

  getStyle = () => ({
    display: 'grid',
    gridTemplateRows: `repeat(${C.BOARD_HEIGHT_CELLS}, 25px)`,
    gridTemplateColumns: `repeat(${C.BOARD_WIDTH_CELLS}, 25px)`,
    gridArea: 'board'
  });

  render () {
    return (
      <div tabIndex="0" style={this.getStyle()} onKeyDown={this.handleKeyDown}>
        { 
          this.state.gridView.map(
            (cellColorList) => cellColorList.map((cellColor) => <Cell cellColor={cellColor}/>)
          )
        }
      </div>
    );
  }
}

export default Board;