import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../Models/player";
import {Colors} from "../Models/colors";


interface TimerProps{
    currentPlayer : Player | null;
    restart: () => void;
}
const Timer : FC<TimerProps> = ({currentPlayer, restart}) => {

    const [blackTime, setBlackTime] = useState(300);
    const [whiteTime, setWhiteTime] = useState(300);

    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect( () => {
        startTimer()
    }, [currentPlayer])

    function startTimer(){

        if (timer.current){
            clearInterval(timer.current);
        }

        const callback = currentPlayer?.color === Colors.white
        ? decrementWhiteTimer
        : decrementBlackTimer

        timer.current = setInterval(callback, 1000);
    }

    function decrementBlackTimer(){
        setBlackTime(prev => prev - 1);
    }

    function decrementWhiteTimer(){
        setWhiteTime(prev => prev - 1);
    }

    function timerHandler() {
        setWhiteTime(300);
        setBlackTime(300);
        restart();
    }

    return (
        <div>
            <button onClick={timerHandler}>Restart</button>
            <h3>Время черные - {blackTime}</h3>
            <h3>Время белые - {whiteTime}</h3>

        </div>
    );
};

export default Timer;