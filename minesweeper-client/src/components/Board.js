import React from 'react'
import './App.css';

export const Board = ({rows, columns}) => {

    console.log('Rows and columns to create ', rows)
    console.log('Rows and columns to create ', columns)


    return (
        <div id="field">
            <table>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </div>
    )
}
