import React from 'react';
import Timer from './Timer';
import Board from './Board';
import Block from './Block';

class Game extends React.Component {
  tickRate = 1;
  boardHeight = 20;
  boardWidth = 10;

  getStyle() {
    const style = {
      padding: '50px'
    }

    return style;
  }

  setNewBlock() {
    this.setState({
      currentBlock: Block.getRandomBlock()
    });
  }

  componentWillMount(){
    this.setNewBlock();
  }

  render () {
    if(this.currentBlock.hasCollided()){
      this.setNewBlock();
    }
    else{
      return (
        <div style={this.getStyle()}>
          <Timer />
          <Board height={this.boardHeight} width={this.boardWidth} />
        </div>
      );
    }
  }
}

export default Game;