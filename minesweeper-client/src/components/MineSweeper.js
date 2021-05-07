import React, { useState } from 'react'
import { Board } from './Board'
import { InputForm } from './InputForm'
import './App.css';

export const MineSweeper = () => {

    const [rows, setRows] = useState();
    const [columns, setColumns] = useState();

    const [gameId, setGameId] = useState();
    const [gameStatus, setGameStatus] = useState('');

    return (
        <div className="container">
            <div className="d-flex justify-content-center mt-5">
                <h3>MineSweeper</h3>
                <hr />
            </div>
            <div className="d-flex justify-content-center mt-5">
                <InputForm 
                    setRows={setRows}
                    setColumns={setColumns}
                    setGameId={setGameId}
                    setGameStatus={setGameStatus}
                />

                
            </div>

            <div className="d-flex justify-content-center mt-5 box">
                {
                    (rows && columns) && (
                        <Board 
                            rows={rows}
                            columns={columns}
                            gameId={gameId}
                            gameStatus={gameStatus}
                            setGameStatus={setGameStatus}
                        />
                    )
                }
                
            </div>

            <div className="d-flex justify-content-center mt-5 box">
                {
                    gameStatus && (
                        <h3>{gameStatus}</h3>
                    )
                }
            </div>
        </div>
    )
}
