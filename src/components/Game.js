import React from 'react';
import Timer from './Timer';
import Board from './Board';
import Block from './Block';

class Game extends React.Component {
  getTickRate = () => 1;

  getBoardDimensions = () => ({
    height: 20,
    width: 10
  });

  getBlockStartCoordinates = () => ({
    x: 0,
    y: this.boardWidth/2 - 1
  });

  getStyle = () => ({
    padding: '50px'
  });

  setNewBlock() {
    this.setState({
      currentBlock: Block.getRandomBlock(this.getBlockStartCoordinates())
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
          <Board boardDimensions={this.getBoardDimensions()} />
        </div>
      );
    }
  }
}

export default Game;