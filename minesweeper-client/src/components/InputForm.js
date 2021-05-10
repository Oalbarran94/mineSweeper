import React, {useState} from 'react';
import axiosClient from '../config/axiosClient';
import './App.css';

export const InputForm = ({setRows, setColumns, setGameId, setGameStatus, gameStatus, setGamePlayer, gameId, setStartCounting, timer, setGameNotPaused}) => {

    const[gameParams, setGameParams] = useState({
        rows: '',
        columns: '',
        mines: '',
        user: ''
    });

    const{ rows, columns, mines, user } = gameParams;


    const onSubmitForm = async (e) => {
        
        e.preventDefault();

        if(user === ''){
            alert('User is a mandatory field');
            return;
        }
        if(rows === ''){
            alert('Row is a mandatory field');
            return;
        }
        if(columns === ''){
            alert('Columns is a mandatory field');
            return;
        }
        if(mines === ''){
            alert('Mine is a mandatory field');
            return;
        }
        

        setRows(undefined);
        setColumns(undefined);
        setGameNotPaused(undefined);

        try{
            const game = await axiosClient.post('/mines/api/creategame', {
                "rowsNumber": rows,
                "columnsNumber": columns,
                "minesNumber": mines,
                "userName": user
            });

            setRows(rows);
            setColumns(columns);
            setGamePlayer(user)
            setGameId(game.data.gameId)
            setGameStatus(game.data.gameStatus);
            setStartCounting(true);
            
        }catch(error){
            console.log('error ', error)
        }

        setGameParams({
            rows: '',
            columns: '',
            mines: '',
            user: ''
        })

    }

    const updateState = (event) => {
        
        setGameParams({
            ...gameParams,
            [event.target.name]: event.target.value
        })
    }

    const onClickPause = async (e) => {
        setGameNotPaused(undefined);
        e.preventDefault();
        try{
            const game = await axiosClient.get(`/mines/api/pausegame/${gameId}/${timer}`);
            setGameStatus(game.data.gameStatus);
        }catch(error){
            console.log('error ', error)
        }

        setGameParams({
            rows: '',
            columns: '',
            mines: '',
            user: ''
        })

        setRows(undefined);
        setColumns(undefined);
        setStartCounting(false);
        setGameNotPaused(undefined);
    }

    return (
        <div className="container"> 
            <form onSubmit={onSubmitForm}>

                <div className="form-group row mt-1">
                    <label htmlFor="user" className="col-sm-1 col-form-label">User</label>
                    <div className="col-sm-3">
                        <input type="text" name="user" value={user} className="form-control" id="columns" placeholder="User" onChange={updateState}/>
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
                    <button disabled={gameStatus ==='PLAYING'} type="submit" className="btn btn-primary mb-2 col-sm-2">Start game</button>
                    <button disabled={gameStatus !=='PLAYING'} onClick={onClickPause} className="btn btn-info mb-2 col-sm-2 marginLeft">Pause game</button>
                </div>
            </form>
        </div>
    )
}
