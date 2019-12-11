import React from 'react';

class Timer extends React.Component {
    getStyle() {
        const style = {
            textAlign: 'center',
            fontSize: '2em'
        }

        return style;
    }

    getTime() {
        return Math.floor(Date.now() / 1000);
    }

    componentWillMount() {
        this.setState({
            startTime: this.getTime(),
            currentTime: this.getTime(),
            timer: setInterval(() => {
                this.setState({ currentTime: this.getTime() });
            }, 1000)
        });
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    render() {
        return(
            <div style={this.getStyle()}>
                <span>{ this.state.currentTime - this.state.startTime }</span>
            </div>
        );
    }
}

export default Timer;