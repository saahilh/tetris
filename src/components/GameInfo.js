import React from 'react';

class GameInfo extends React.Component {
    getStyle = (gridArea) => ({
        fontSize: '2em',
        padding: '10px',
        width: '100%',
        border: 'solid black 1px',
        gridArea: gridArea
    });

    render() {
        return(
            <div style={this.getStyle(this.props.gridArea)}>
                <span>{this.props.heading}: </span>
                <span>{this.props.info}</span>
            </div>
        );
    }
}

export default GameInfo;