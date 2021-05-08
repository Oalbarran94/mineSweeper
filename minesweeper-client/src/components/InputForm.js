import React, {useState} from 'react';
import axiosClient from '../config/axiosClient';

export const InputForm = ({setRows, setColumns, setGameId, setGameStatus}) => {

    const[gameParams, setGameParams] = useState({
        rows: '',
        columns: '',
        mines: '',
        user: ''
    });

    const{ rows, columns, mines, user } = gameParams;


    const onSubmitForm = async (e) => {
        setRows(undefined);
        setColumns(undefined);
        e.preventDefault();

        try{
            const gameId = await axiosClient.post('/mines/api/creategame', {
                "rowsNumber": rows,
                "columnsNumber": columns,
                "minesNumber": mines,
                "userName": user
            });

            console.log('gameid ', gameId.data)

            setRows(rows);
            setColumns(columns);
            setGameId(gameId.data)
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

                <div className="form-group row mt-1">
                    <label htmlFor="user" className="col-sm-1 col-form-label">User</label>
                    <div className="col-sm-3">
                        <input type="text" name="user" value={user} className="form-control" id="columns" placeholder="Usuer" onChange={updateState}/>
                    </div>
                </div>

                <div className="form-group row mt-1">
                    <label htmlFor="row" className="col-sm-1 col-form-label">Rows</label>
                    <div className="col-sm-3">
                        <input type="text" name="rows" value={rows} className="form-control" id="row" placeholder="Rows" onChange={updateState}/>
                    </div>
                </div>

                <div className="form-group row mt-1">
                    <label htmlFor="columns" className="col-sm-1 col-form-label">Columns</label>
                    <div className="col-sm-3">
                        <input type="text" name="columns" value={columns} className="form-control" id="columns" placeholder="Columns" onChange={updateState}/>
                    </div>
                </div>

                <div className="form-group row mt-1">
                    <label htmlFor="mines" className="col-sm-1 col-form-label">Mines</label>
                    <div className="col-sm-3">
                        <input type="text" name="mines" value={mines} className="form-control" id="mines" placeholder="Mines" onChange={updateState}/>
                    </div>
                </div>

                <div className="form-group row justify-content-cente mt-2">
                    <button type="submit" className="btn btn-primary mb-2 col-sm-2">Start game</button>
                </div>
            </form>
        </div>
    )
}
