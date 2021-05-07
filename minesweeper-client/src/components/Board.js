import React from 'react'
import './App.css';

import axiosClient from '../config/axiosClient';

export const Board = (elements) => {

    console.log('gameID in board ', elements.gameId)


    const clickCoordinate = (e) => {
        let id = e.target.id;

        let coordinates = id.split('|')

        console.log(coordinates)

        let coordinateX = coordinates[0].substr(coordinates[0].length - 1);
        let coordinateY = coordinates[1].substr(coordinates[1].length - 1);

        try{
            const result = axiosClient.get(`/mines/api/checkgame/${elements.gameId}/${coordinateX}/${coordinateY}`);
            console.log('Result ', result);

        }catch(error){
            console.log('error ', error)
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
