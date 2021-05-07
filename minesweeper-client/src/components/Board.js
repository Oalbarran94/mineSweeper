import React from 'react'
import './App.css';

import axiosClient from '../config/axiosClient';

export const Board = (elements) => {

    console.log('gameID in board ', elements.gameId)

    let bomb = '💣';


    const clickCoordinate = async (e) => {
        console.log('element status ', elements.gameStatus)
        if(elements.gameStatus === 'BOOM!!!' || elements.gameStatus === 'The game is over'){
            return;
        }

        let id = e.target.id;

        let coordinates = id.split('|')

        console.log(coordinates)

        let coordinateX = coordinates[0].substr(coordinates[0].length - 1);
        let coordinateY = coordinates[1].substr(coordinates[1].length - 1);

        const checkStatusGame = async () => {
            try{
                return await axiosClient.get(`/mines/api/checkgame/${elements.gameId}/${coordinateX}/${coordinateY}`);
                // console.log('Result ', result);
                // return result;
    
            }catch(error){
                let errorGame = error.message;
                elements.setGameStatus("The game is over");
                return errorGame;
                console.log('error ', error)
            }
        }


        let gameStatus = await checkStatusGame();
        console.log('sfafs ', gameStatus)

        if(gameStatus === 'Request failed with status code 500'){
            return;
        } else{
            elements.setGameStatus(gameStatus.data.gameStatus)
            console.log(' result gotten ', gameStatus)
    
            //test
            
            for(let i = 0; i < gameStatus.data.fields.length; i++){
                //console.log('element ', gameStatus.data.fields[i]);
                let element = gameStatus.data.fields[i];
                console.log('element ', element);
                for(let j = 0; j < element.length; j++){
                    console.log("cube[" + i + "][" + j + "] = " + element[j]);
                    console.log('element ', element[j].mine);
                    if(gameStatus.data.gameStatus === 'BOOM!!!'){
                        console.log('game over')
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
                        console.log('printing viible stuff')
                    }
                }
            }
            
        }

    }

    const createTable = () => {
        let table = []

        // Outer loop to create parent
        for (let i = 0; i < elements.rows; i++) {
            let children = []
            //Inner loop to create children
            for (let j = 0; j < elements.columns; j++) {
                children.push(<td id={`r-${i}|c-${j}`} onClick={clickCoordinate}></td>)
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
