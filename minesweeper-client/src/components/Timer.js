import React, {useState, useEffect} from 'react'

export const Timer = () => {

    let initialMinute = 0;
    let initialSeconds = 0;
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    useEffect(()=>{
    let myInterval = setInterval(() => {
            if (seconds < 59) {
                setSeconds(seconds + 1);
            }
            if (seconds === 59) {
                if (minutes === 59) {
                    clearInterval(myInterval)
                } else {
                    setMinutes(minutes + 1);
                    setSeconds(0);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    return (
        <div>
            { minutes === 0 && seconds === 0
                ? null
                : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
            }
        </div>
    )
}
