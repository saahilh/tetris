import React from 'react';
import Timer from './Timer'

class Game extends React.Component {
    render () {
        return (
            <div className="game">
                <Timer />
            </div>
        );
    }
}

export default Game;