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
    clearInterval(this.state.ticker);
  }

  redraw() {
    this.setState({
      gridView: this.state.grid.getViewWithBlock(this.state.grid.getActiveBlock())
    });
  }

  update() {
    this.redraw();

    let grid = this.state.grid;

    if(grid.blockCanMoveDown(this.state.grid.getActiveBlock())){
      grid.getActiveBlock().moveDown();
    }
    else{
      grid.storeBlock(grid.getActiveBlock());
      let scoreToAdd = this.clearFilledRows();
      grid.addScore(scoreToAdd);
      grid.setActiveBlock(Block.getRandomBlock());
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

  handleKeyDown = (event) => {
    let keyCode = event.keyCode; 
    let grid = this.state.grid;

    if(keyCode === 82){ // r key
      this.props.restartGame();
    }
    if(keyCode === 37 && grid.blockCanMoveLeft(grid.getActiveBlock())){ // Left arrow
      grid.getActiveBlock().moveLeft();
    }
    else if(keyCode === 39 && grid.blockCanMoveRight(grid.getActiveBlock())){ // Right arrow
      grid.getActiveBlock().moveRight();
    }
    else if(keyCode === 38 && grid.blockCanRotate(grid.getActiveBlock())){ // Up arrow
      grid.getActiveBlock().rotate();
    }
    else if(keyCode === 40){ // Down arrow
      this.update();
    }
    else if(keyCode === 32){ // Space bar
      while(grid.blockCanMoveDown()){
        this.update();
      }
      
      this.update();
    }
    
    this.redraw();
  }

  getStyle = () => ({
    display: 'grid',
    gridTemplateRows: `repeat(${C.BOARD_HEIGHT_CELLS}, 25px)`,
    gridTemplateColumns: `repeat(${C.BOARD_WIDTH_CELLS}, 25px)`
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