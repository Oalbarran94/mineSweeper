import React, {useState, useEffect} from 'react'

export const Timer = ({setTimer, startCounting}) => {

    let initialMinute = 0;
    let initialSeconds = 0;
    const [ minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] =  useState(initialSeconds);
    let intervalTimeId;

    useEffect(()=>{
            intervalTimeId = setInterval(() => {
                if (seconds < 59) {
                    setSeconds(seconds + 1);
                }
                if (seconds === 59) {
                    if (minutes === 59) {
                        clearInterval(intervalTimeId)
                    } else {
                        setMinutes(minutes + 1);
                        setSeconds(0);
                    }
                } 
                setTimer(`${minutes}:${seconds < 10 ?  `0${seconds}` : seconds}`)
            }, 1000)

            if(!startCounting){
                setMinutes(0);
                initialSeconds(0);
                clearInterval(intervalTimeId);
            }
            return ()=> {
                clearInterval(intervalTimeId);
            };
    }, [minutes, seconds]);

    return (
        <div>
            {
                !startCounting ? (
                    clearInterval(intervalTimeId)
                ) : (
                     minutes === 0 && seconds === 0
                        ? null
                        : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
                )
            }
            
        </div>
    )
}
