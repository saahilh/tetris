import React from 'react';
import Timer from './Timer';
import Board from './Board';
import Block from './Block';

class Game extends React.Component {
  tickRate = 1;

  boardDimensions = {
    height: 20,
    width: 10
  }

  blockStartCoordinates = {
    x: 0,
    y: this.boardWidth/2 - 1
  }

  getStyle = () => ({
    padding: '50px'
  });

  setNewBlock() {
    this.setState({
      currentBlock: Block.getRandomBlock(this.blockStartCoordinates)
    });
  }

  componentWillMount(){
    this.setNewBlock();
  }

  render () {
    if(this.state.currentBlock.hasCollided()){
      this.setNewBlock();
    }
    else{
      return (
        <div style={this.getStyle()}>
          <Timer />
          <Board boardDimensions={this.boardDimensions} />
        </div>
      );
    }
  }
}

export default Game;