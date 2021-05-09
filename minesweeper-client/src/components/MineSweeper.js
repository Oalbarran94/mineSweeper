import React, { useState, useEffect } from 'react'
import { Board } from './Board'
import { InputForm } from './InputForm'
import './App.css';
import axiosClient from '../config/axiosClient';

export const MineSweeper = () => {

    const [rows, setRows] = useState();
    const [columns, setColumns] = useState();

    const [gameId, setGameId] = useState();
    const [gameStatus, setGameStatus] = useState('');
    const [gamePlayer, setGamePlayer] = useState('');

    const[playedGames, setPlayedGames] = useState();

    const[gameNotPaused, setGameNotPaused] = useState();

    useEffect(() => {

        console.log('PAYER ', gamePlayer);

        const fetchGames = async () => {
            const url = `http://localhost:8080/mines/api/playedgames/${gamePlayer}`;
            const respuesta = await fetch(url);
            const resultado = await respuesta.json();
            setPlayedGames(resultado);
        }

        if(gamePlayer !== ''){
            fetchGames();
        }

    }, [gamePlayer, gameStatus]);


    const renderStatus = (gameStatus) => {

        if(gameStatus === 'Congratulations!! You won :D.'){
            return (
                <span class="badge bg-primary">Finished. Win</span>
            )
        } else if(gameStatus === 'GAME OVER' || gameStatus === 'The game is over'){
            return (
                <span class="badge bg-danger">Finished. Game Over</span>
            )
        } else {
            return (
                <span class="badge bg-info">Paused</span>
            )
        }
        
    }

    const resumeGame = async () => {
        try{
            const game = await axiosClient.get(`/mines/api/pausegame/${gameId}`);

            if(game.data.gameStatus === 'PLAYING'){
                setRows(game.data.rowsNumber);
                setColumns(game.data.columnsNumber);
            }

            setGameNotPaused(game.data)
            setGameStatus(game.data.gameStatus);
        }catch(error){
            console.log('error ', error)
        }
    }

    return (
        <div className="container">
            <div className="row pt-4">
                <div className="col-8">
                    <div className="mt-5">
                        <h3>MineSweeper</h3>
                        <hr />

                        <div className=" mt-5">
                            <InputForm 
                                gameId={gameId}
                                gameStatus={gameStatus}
                                setRows={setRows}
                                setColumns={setColumns}
                                setGameId={setGameId}
                                setGameStatus={setGameStatus}
                                setGamePlayer={setGamePlayer}
                            />
                        </div>

                        <div className=" mt-5 box">
                             {
                                (rows && columns) && (
                                    <Board 
                                        rows={rows}
                                        columns={columns}
                                        gameId={gameId}
                                        gameStatus={gameStatus}
                                        gameNotPaused={gameNotPaused}
                                        setGameStatus={setGameStatus}
                                    />
                                )
                            }
                            
                        </div>

                        <div className="mt-5 box">
                            {
                                gameStatus && (
                                    <h3>{gameStatus}</h3>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="mt-5">
                        <h3>History {`for ${gamePlayer}`}</h3>
                        <hr />
                    </div>

                    {
                        playedGames && gamePlayer ? (
                            playedGames.map(item => (
                                <div className="card w-100">
                                <div className="card-body">
                                    <h6 className="card-description">Game Status {renderStatus(item.historyGame.gameStatus)}</h6>
                                    {
                                        item.historyGame.gameStatus === 'PAUSED' && (
                                            <button onClick={resumeGame} className="btn btn-primary col-sm-3">Resume</button>
                                        )
                                    }
                                    
                                </div>
                            </div>
                        ))
                            
                        ) : (
                            <h6>No games played yet</h6>
                        )
                    }

                    
                </div>
            </div>
        </div>
    )
}
