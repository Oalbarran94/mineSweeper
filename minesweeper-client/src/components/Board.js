import React, {useEffect} from 'react'
import './App.css';

import axiosClient from '../config/axiosClient';

export const Board = (elements) => {

    const bomb = '💣';
    const redFlag = '🚩';

    useEffect(() => {

        if(elements.gameNotPaused){
            for(let i = 0; i < elements.gameNotPaused.fields.length; i++){
                let element = elements.gameNotPaused.fields[i];
                for(let j = 0; j < element.length; j++){
                    if(element[j].visited){
                        let currentId = `r-${i}|c-${j}`;
                        document.getElementById(currentId).innerHTML = element[j].countOfNeighbourMines;
                    }
                    if(element[j].flagged){
                        let currentId = `r-${i}|c-${j}`;
                        document.getElementById(currentId).innerHTML = redFlag;
                    }
                }
            }
        }

        
    }, [elements.gameNotPaused]);

    const getSecondPartId = (id) => {
        return id.split('-')[1];
    }


    const clickCoordinate = async (e) => {
        console.log('TARGET ', e.target)

        if(elements.gameStatus === 'GAME OVER' || elements.gameStatus === 'The game is over'){
            elements.setStartCounting(false);
            elements.setTimer(undefined);
            return;
        }

        if(elements.gameStatus === 'Congratulations!! You won :D.'){
            elements.setStartCounting(false);
            elements.setTimer(undefined);
            return;
        }

        let id = e.target.id;

        let coordinates = id.split('|')
        console.log('COORDINATEEEEE idddd', coordinates)

        let coordinateX = getSecondPartId(coordinates[0]);
        let coordinateY = getSecondPartId(coordinates[1]);

        console.log('COORDINATEEEEE ', `r-${coordinateX}|c-${coordinateY}`)

        if (e.type === 'click') {
            const checkStatusGame = async () => {
                try{
                    return await axiosClient.get(`/mines/api/checkgame/${elements.gameId}/${coordinateX}/${coordinateY}/${elements.timer}`);
                }catch(error){
                    let errorGame = error.message;
                    elements.setGameStatus("The game is over");
                    return errorGame;
                }
            }
    
            let gameStatus = await checkStatusGame();

            if(gameStatus === 'Request failed with status code 500'){
                elements.setTimer(undefined);
                return;
            } else{
                elements.setGameStatus(gameStatus.data.gameStatus)
        
                for(let i = 0; i < gameStatus.data.fields.length; i++){
                    let element = gameStatus.data.fields[i];
                    for(let j = 0; j < element.length; j++){
                        if(gameStatus.data.gameStatus === 'GAME OVER'){
                            elements.setGameStatus(gameStatus.data.gameStatus);
                            if(element[j].mine){
                                let currentId = `r-${i}|c-${j}`;
                                document.getElementById(currentId).innerHTML = bomb;
                            }
                            
                        }else{
                            if(element[j].visited){
                                let currentId = `r-${i}|c-${j}`;
                                document.getElementById(currentId).innerHTML = element[j].countOfNeighbourMines;
                            }
                        }
                    }
                }

                if(gameStatus.data.gameStatus === 'GAME OVER' || gameStatus.data.gameStatus === 'The game is over'){
                    elements.setStartCounting(false);
                    elements.setTimer(undefined);
                }
        
                if(gameStatus.data.gameStatus === 'Congratulations!! You won :D.'){
                    elements.setStartCounting(false);
                    elements.setTimer(undefined);
                }
                
            }
        } else if (e.type === 'contextmenu') {
            const flaggedField = async () => {
                try{
                    return await axiosClient.get(`/mines/api/flaggedfield/${elements.gameId}/${coordinateX}/${coordinateY}`);
                }catch(error){
                    let errorGame = error.message;
                    elements.setGameStatus("The game is over");
                    return errorGame;
                }
            }

            let gameStatus = await flaggedField();

            let currentId = `r-${coordinateX}|c-${coordinateY}`;

            document.getElementById(currentId).innerHTML = redFlag;
        }

    }

    const createTable = () => {
        let table = []

        for (let i = 0; i < elements.rows; i++) {
            let children = []
            for (let j = 0; j < elements.columns; j++) {
                children.push(<td id={`r-${i}|c-${j}`} onClick={clickCoordinate} onContextMenu={clickCoordinate}></td>)
            }
            table.push(<tr id={`r-${i}`} >{children}</tr>)
        }
        return table
    }

    return (
        <div id="field">
            <table>
                <tbody>
                    {
                        createTable()
                    }
                </tbody>
            </table>
        </div>
    )
}
