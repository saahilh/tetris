import React from 'react';

class Score extends React.Component {
  getStyle = () => ({
    textAlign: 'center',
    fontSize: '2em',
    paddingBottom: '20px',
    gridArea: 'score'
  });

  render() {
    return(
      <div style={this.getStyle()}>
        <span>Score: { this.props.score }</span>
      </div>
    );
  }
}

export default Score;