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

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    render() {
        return(
            <div className="timer center">
                <span>{ this.state.currentTime - this.state.startTime }</span>
            </div>
        );
    }
}

export default Timer;