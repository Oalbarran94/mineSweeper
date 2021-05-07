import React from 'react'
import { InputForm } from './InputForm'

export const MineSweeper = () => {
    return (
        <div className="container">
            <div className="d-flex justify-content-center mt-5">
                <h3>MineSweeper</h3>
                <hr />
            </div>
            <div className="d-flex justify-content-center mt-5">
                <InputForm />
            </div>
        </div>
            )
}
