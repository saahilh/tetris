import React, {useState} from 'react';
import GameInfo from './GameInfo';

const getTime = () => Math.floor(Date.now() / 1000);

function Timer() {
  const [startTime] = useState(getTime());
  const [currentTime, setCurrentTime] = useState(getTime());

  useState(() => {
    const timer = setInterval(() => {
      setCurrentTime(getTime());
    }, 1000)

    return function cleanup() {
      clearInterval(timer);
    }
  }, [])

  return(
    <GameInfo gridArea="timer" heading="Time" info={`${currentTime - startTime}`} />
  );
}

export default Timer;
