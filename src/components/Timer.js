import React from 'react';

class Timer extends React.Component {
    getTime() {
        return Math.floor(Date.now() / 1000);
    }

    startTimer() {
        this.setState({
            currentTime: this.getTime(),
            timer: setInterval(() => {
                this.setState({ currentTime: this.getTime() });
            }, 1000)
        });
    }

    componentWillMount() {
        this.setState({
            startTime: this.getTime()
        });

        this.startTimer();
    }

    render() {
        return(
            <span>{ this.state.currentTime - this.state.startTime }</span>
        );
    }
}

export default Timer;