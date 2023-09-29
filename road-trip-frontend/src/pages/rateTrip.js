import React, {useEffect, useState} from 'react';
import {rateTrip} from "../services/tripService";
import {checkStatus, logout} from "../components/logout";

require('dotenv').config();

export default function RateTrip() {

    const [rating, setRating] = useState();
    const [description, setDescription] = useState();

    function handleSubmit(event) {
        event.preventDefault()
        if(notSet()) {
            let id = '';
            if (typeof window !== 'undefined') {
                id = sessionStorage.getItem("curTrip");
                rateTrip({rating, description, id})
                setTimeout(redirect => {
                    window.location.pathname = "/myTrips"
                    console.log("attempted redirect")
                }, 3000)

            }
        }
    }

    function handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        switch (name) {
            case 'rating':
                setRating(value)
                break;
            case 'description':
                setDescription(value);
                break;
        }
    }

    function notSet(){
        if(rating == null || description == null){
            return false;
        }
        if(rating == '' || description == ''){
            return false;
        }
        return true;
    }

    useEffect( () => {
        if (!checkStatus())
            window.location.pathname='/';
    });

    return (
        <div className='body'>
            <h1 className='header'>Rate Trip</h1>
            <div className='column'>
                <div>
                    <button  className='button' onClick={logout}>Logout</button>
                </div>
                <form>
                    <div className='form-group'>
                        <label>Rating:</label>
                        <input
                            name='rating'
                            className='form-control'
                            value={rating}
                            type='number' min={1} max={10}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Description:</label>
                        <div>
                            <textarea
                                name='description'
                                className='form-control'
                                value={description}
                                cols={100}
                                rows={5}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <a href="/myTrips">
                        <button  className='button' onClick={handleSubmit}>Rate Trip</button>
                    </a>
                </form>
                <a href="/myTrips">
                    <button className='button'>Back</button>
                </a>
            </div>
        </div>
    );
}