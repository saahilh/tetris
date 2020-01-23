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
      activeBlock: Block.getRandomBlock()
    };
  }

  setActiveBlock = (block) => this.setState({activeBlock: block});

  componentDidMount = () => this.update();

  componentWillUnmount = () => clearInterval(this.state.ticker);

  redraw = (showBlock = true) => {
    if(showBlock){
      this.setState({
        gridView: Grid.addBlockToCells(this.state.activeBlock, this.state.grid.getCells())
      });
    } else {
      this.setState({
        gridView: this.state.grid.getCells()
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

      let nextBlock = Block.getRandomBlock();
      this.setActiveBlock(nextBlock);
      
      if(grid.blockOverlapsGrid(nextBlock)){
        this.props.gameOver();
      }
    }
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
      
      this.redraw();
    }
  }

  render () {
    return (
      <div tabIndex="0" style={getStyle()} onKeyDown={this.handleKeyDown}>
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