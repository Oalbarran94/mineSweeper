import React from 'react'
import './App.css';

import axiosClient from '../config/axiosClient';

export const Board = (elements) => {

    console.log('gameID in board ', elements.gameId)

    const bomb = '💣';
    const redFlag = '🚩';


    const clickCoordinate = async (e) => {
        console.log('element status ', elements.gameStatus);

        if(elements.gameStatus === 'BOOM!!!' || elements.gameStatus === 'The game is over'){
            return;
        }

        let id = e.target.id;

        let coordinates = id.split('|')

        console.log(coordinates)

        let coordinateX = coordinates[0].substr(coordinates[0].length - 1);
        let coordinateY = coordinates[1].substr(coordinates[1].length - 1);



        if (e.type === 'click') {
            const checkStatusGame = async () => {
                try{
                    return await axiosClient.get(`/mines/api/checkgame/${elements.gameId}/${coordinateX}/${coordinateY}`);
        
                }catch(error){
                    let errorGame = error.message;
                    elements.setGameStatus("The game is over");
                    return errorGame;
                }
            }
    
            let gameStatus = await checkStatusGame();
    
            if(gameStatus === 'Request failed with status code 500'){
                return;
            } else{
                elements.setGameStatus(gameStatus.data.gameStatus)
        
                for(let i = 0; i < gameStatus.data.fields.length; i++){
                    let element = gameStatus.data.fields[i];
                    for(let j = 0; j < element.length; j++){
                        if(gameStatus.data.gameStatus === 'BOOM!!!'){
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

        // Outer loop to create parent
        for (let i = 0; i < elements.rows; i++) {
            let children = []
            //Inner loop to create children
            for (let j = 0; j < elements.columns; j++) {
                children.push(<td id={`r-${i}|c-${j}`} onClick={clickCoordinate} onContextMenu={clickCoordinate}></td>)
            }
            //Create the parent and add the children
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
