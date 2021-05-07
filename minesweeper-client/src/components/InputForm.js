import React, {useState} from 'react';
import axiosClient from '../config/axiosClient';

export const InputForm = ({setRows, setColumns}) => {

    const[gameParams, setGameParams] = useState({
        rows: '',
        columns: '',
        mines: ''
    });

    const{ rows, columns, mines } = gameParams;


    const onSubmitForm = async (e) => {
        e.preventDefault();

        try{
            await axiosClient.post('/mines/api/creategame', {
                "rowsNumber": rows,
                "columnsNumber": columns,
                "minesNumber": mines,
                "userName": "Osman"
            });

            setRows(rows);
            setColumns(columns);
        }catch(error){
            console.log('error ', error)
        }

    }

    const updateState = (event) => {
        
        setGameParams({
            ...gameParams,
            [event.target.name]: event.target.value
        })
    }

    

    return (
        <div className="container"> 
            <form onSubmit={onSubmitForm}>
                <div className="form-group row d-flex justify-content-center mt-1">
                    <label for="row" className="col-sm-1 col-form-label">Rows</label>
                    <div class="col-sm-2">
                        <input type="text" name="rows" value={rows} class="form-control" id="row" placeholder="Rows" onChange={updateState}/>
                    </div>
                </div>

                <div className="form-group row d-flex justify-content-center mt-1">
                    <label for="columns" className="col-sm-1 col-form-label">Columns</label>
                    <div class="col-sm-2">
                        <input type="text" name="columns" value={columns} class="form-control" id="columns" placeholder="Columns" onChange={updateState}/>
                    </div>
                </div>

                <div className="form-group row d-flex justify-content-center mt-1">
                    <label for="mines" className="col-sm-1 col-form-label">Mines</label>
                    <div class="col-sm-2">
                        <input type="text" name="mines" value={mines} class="form-control" id="mines" placeholder="Mines" onChange={updateState}/>
                    </div>
                </div>

                <div className="form-group row d-flex justify-content-center mt-2">
                    <button type="submit" className="btn btn-primary mb-2 col-sm-1">Start game</button>
                </div>
            </form>
        </div>
    )
}
