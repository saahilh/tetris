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
      gridView: grid.cells,
      activeBlock: Block.getRandomBlock(),
      nextBlock: Block.getRandomBlock(),
    };
  }

  componentDidMount = () => {
    this.redraw();
    this.update();
    this.gameRef.focus();
  }

  componentWillUnmount = () => clearInterval(this.state.ticker);

  redraw = (showBlock = true) => {
    const gridView = 
      showBlock
        ? this.state.grid.addBlockToCells(this.state.activeBlock)
        : this.state.grid.cells

    this.setState({
      gridView: gridView
    });
  }

  update = () => {
    this.redraw();

    if(this.state.grid.blockCanMoveDown(this.state.activeBlock)){
      this.state.activeBlock.moveDown();
    } else {
      this.lockPiece();
      // const lock = setTimeout(() => this.lockPiece(), 500);

      // this.setState({
      //   lock: lock
      // });
    }
  }

  lockPiece = () => {
    const grid = this.state.grid;

    grid.storeBlock(this.state.activeBlock);
    let scoreToAdd = grid.clearFilledRows();
    grid.addScore(scoreToAdd);
    this.redraw(false);

    let nextBlock = this.consumeNextBlock();
    this.setState({activeBlock: nextBlock})
    
    if(grid.blockOverlapsGrid(nextBlock)){
      this.props.gameOver();
    }
  }

  consumeNextBlock = () => {
    let nextBlock = this.state.nextBlock;
    this.setState({nextBlock: Block.getRandomBlock()});
    return nextBlock;
  }

  swapSavedBlock = () => {
    let newActiveBlock = this.this.state.savedBlock ? this.this.state.savedBlock : this.consumeNextBlock();
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
      
      this.lockPiece();
    } else {
      //clearTimeout(this.state.lock);
      
      if(keyCode === 40 && grid.blockCanMoveDown(this.state.activeBlock)){ // Down arrow
        this.state.activeBlock.moveDown();
      } else if(keyCode === 37 && grid.blockCanMoveLeft(this.state.activeBlock)){ // Left arrow
        this.state.activeBlock.moveLeft();
      } else if(keyCode === 39 && grid.blockCanMoveRight(this.state.activeBlock)){ // Right arrow
        this.state.activeBlock.moveRight();
      } else if(keyCode === 38 && grid.blockCanRotate(this.state.activeBlock)){ // Up arrow
        this.state.activeBlock.rotate();
      } else if(keyCode === 16){ // Shift key
        this.swapSavedBlock();
      }
      
      this.redraw();
    }
  }

  setGameRef = game => {
    this.gameRef = game;
  }

  render () {
    return (
      <div ref={this.setGameRef} tabIndex="0" style={getStyle()} onKeyDown={this.handleKeyDown}>
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
