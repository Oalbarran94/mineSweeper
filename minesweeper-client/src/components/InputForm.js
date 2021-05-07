import React from 'react';
import axiosClient from '../config/axiosClient';

export const InputForm = () => {

    const onSubmitForm = (e) => {
        e.preventDefault();
        console.log('submiting form');

        try{
            axiosClient.post('/mines/api/creategame', {
                "columnsNumber": 3,
                "minesNumber": 2,
                "rowsNumber": 3,
                "userName": "Osman"
            })
        }catch(error){
            console.log('error ', error)
        }

    }

    return (
        <div className="container"> 
            <form onSubmit={onSubmitForm}>
                <div className="form-group row d-flex justify-content-center mt-1">
                    <label for="row" className="col-sm-1 col-form-label">Rows</label>
                    <div class="col-sm-2">
                        <input type="text" class="form-control" id="row" placeholder="Rows" />
                    </div>
                </div>

                <div className="form-group row d-flex justify-content-center mt-1">
                    <label for="columns" className="col-sm-1 col-form-label">Columns</label>
                    <div class="col-sm-2">
                        <input type="text" class="form-control" id="columns" placeholder="Columns" />
                    </div>
                </div>

                <div className="form-group row d-flex justify-content-center mt-1">
                    <label for="mines" className="col-sm-1 col-form-label">Mines</label>
                    <div class="col-sm-2">
                        <input type="text" class="form-control" id="mines" placeholder="Mines" />
                    </div>
                </div>

                <div className="form-group row d-flex justify-content-center mt-2">
                    <button type="submit" className="btn btn-primary mb-2 col-sm-1">Start game</button>
                </div>
            </form>
        </div>
    )
}
