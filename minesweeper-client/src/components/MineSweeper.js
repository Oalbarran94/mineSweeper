import React, { useState } from 'react'
import { Board } from './Board'
import { InputForm } from './InputForm'
import './App.css';

export const MineSweeper = () => {

    const [rows, setRows] = useState();
    const [columns, setColumns] = useState();

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
                />

                
            </div>

            <div className="d-flex justify-content-center mt-5 box">
                {
                    (rows && columns) && (
                        <Board 
                            rows={rows}
                            columns={columns}
                        />
                    )
                }
                
            </div>
        </div>
    )
}
