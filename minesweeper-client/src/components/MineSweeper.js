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

            <div className="row pt-4">
                <div className="col-8">
                    <div className="mt-5">
                        <h3>MineSweeper</h3>
                        <hr />

                        <div className=" mt-5">
                            <InputForm 
                                setRows={setRows}
                                setColumns={setColumns}
                                setGameId={setGameId}
                                setGameStatus={setGameStatus}
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
                        <h3>History</h3>
                        <hr />
                    </div>
                </div>
            </div>
        </div>



        // <div className="container">
        //     <div className="row">
        //         <div className="col-lg">
        //             <div className="col-2">
        //                 1 of 3
        //             </div>
        //         </div>
        //         <div className="col-lg">
        //             <div className="col-8">

        //                 <div className=" d-flex justify-content-center mt-5">
        //                     <h3>MineSweeper</h3>
        //                     <hr />
        //                 </div>
        //                 <div className="d-flex justify-content-center mt-5">
        //                     <InputForm 
        //                         setRows={setRows}
        //                         setColumns={setColumns}
        //                         setGameId={setGameId}
        //                         setGameStatus={setGameStatus}
        //                     />

                            
        //                 </div>

        //                 <div className="d-flex justify-content-center mt-5 box">
        //                     {
        //                         (rows && columns) && (
        //                             <Board 
        //                                 rows={rows}
        //                                 columns={columns}
        //                                 gameId={gameId}
        //                                 gameStatus={gameStatus}
        //                                 setGameStatus={setGameStatus}
        //                             />
        //                         )
        //                     }
                            
        //                 </div>

        //                 <div className="d-flex justify-content-center mt-5 box">
        //                     {
        //                         gameStatus && (
        //                             <h3>{gameStatus}</h3>
        //                         )
        //                     }
        //                 </div>

        //             </div>
                    
        //         </div>

        //         <div class="col-lg">
        //         <div className="col-2">
        //                 1 of 3
        //             </div>
        //         </div>
                
        //     </div>
            
        // </div>
    )
}
