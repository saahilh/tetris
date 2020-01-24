import React from 'react';
import Block from './Block';
import Cell from './Cell';
import * as C from '../constants';
import Grid from './Grid';

const getStyle = () => ({
  display: 'grid',
  gridTemplateRows: `repeat(${C.BOARD_HEIGHT_CELLS}, 25px)`,
  gridTemplateColumns: `repeat(${C.BOARD_WIDTH_CELLS}, 25px)`,
  gridArea: 'board'
});

class Board extends React.Component {
  constructor(props) {
    super(props);

    let grid = new Grid(this.props.addScore);

    this.state = {
      ticker: setInterval(() => this.update(), 1000),
      grid: grid,
      gridView: grid.getCells(),
      activeBlock: Block.getRandomBlock(),
      nextBlock: Block.getRandomBlock()
    };
  }

  setActiveBlock = (block) => this.setState({activeBlock: block});

  componentDidMount = () => this.update();

  componentWillUnmount = () => clearInterval(this.state.ticker);

  redraw = (showBlock = true) => {
    if(showBlock){
      this.setState({
        gridView: this.state.grid.addBlockToCells(this.state.activeBlock)
      });
    } else {
      this.setState({
        gridView: this.state.grid.cells
      });
    }
  }

  update = () => {
    this.redraw();

    let grid = this.state.grid;

    if(grid.blockCanMoveDown(this.state.activeBlock)){
      this.state.activeBlock.moveDown();
    } else {
      grid.storeBlock(this.state.activeBlock);
      let scoreToAdd = grid.clearFilledRows();
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
    let newSavedBlock = this.state.activeBlock;

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
    } else if(keyCode === 32){ // Space bar
      while(grid.blockCanMoveDown(this.state.activeBlock)){
        this.update();
      }
      
      this.update();
    } else if(keyCode === 40){ // Down arrow
      this.update();
    } else{
      if(keyCode === 37 && grid.blockCanMoveLeft(this.state.activeBlock)){ // Left arrow
        this.state.activeBlock.moveLeft();
      } else if(keyCode === 39 && grid.blockCanMoveRight(this.state.activeBlock)){ // Right arrow
        this.state.activeBlock.moveRight();
      } else if(keyCode === 38 && grid.blockCanRotate(this.state.activeBlock)){ // Up arrow
        this.state.activeBlock.rotate();
      }
      else if(keyCode === 16){ // Shift key
        this.swapSavedBlock();
      }
      
      this.redraw();
    }
  }

  render () {
    return (
      <div tabIndex="0" style={getStyle()} onKeyDown={this.handleKeyDown}>
        { 
          this.state.gridView.map(
            (cellColorList, x) => cellColorList.map(
              (cellColor, y) => <Cell key={`${x},${y}`} cellColor={cellColor}/>
            )
          )
        }
      </div>
    );
  }
}

export default Board;