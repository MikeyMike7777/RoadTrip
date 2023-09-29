import React, {useEffect, useState} from 'react';
import {findStops, storeStop} from "../services/stopService";
import axios from "axios";
import {checkStatus} from "../components/logout";

export default function AddStops() {

    const [stopLoc, setStopLoc] = useState('');
    const [result, setResult] = useState('');

    const displayStops = async () => {
        let id = '';
        let result;
        if (typeof window !== 'undefined') {
            id = sessionStorage.getItem("curTrip");
            result = await findStops({id});
        } else {
            console.log("Null TripID")
            result = await findStops({id});
        }
        setList(result);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        let id = '';
        let name;
        let message;
        let lat, lon;

        await axios.get(process.env.ROAD_TRIP_API_URL + '/locationSearch/' + stopLoc)
            .then(response => {
                console.log(response.data);
                message = response.data;
            })
            .catch(error => {
                console.error(error);
            });

        if (message.hasOwnProperty("results")) {
            lat = message.results.at(0).geometry.location.lat;
            lon = message.results.at(0).geometry.location.lng;
            name = message.results.at(0).name;

            if (typeof window !== 'undefined') {
                id = sessionStorage.getItem("curTrip");
                await storeStop({lat, lon, name, id});
            } else {
                console.log("Null TripID")
                await storeStop({lat, lon, name, id});
            }
            setResult("Stop Added!");
        } else {
            setResult(message);
        }
    }

    function handleInputChange(event) {
        const target = event.target;
        const value = target.value;

        setStopLoc(value);
    }

    function notSet(){
        if(stopLoc == null)
            return false;
        return stopLoc !== '';
    }

    const [list, setList] = useState()

    useEffect(() => {
        if (!checkStatus())
            window.location.pathname='/';
        setList(<h2>Finding your perfect stops...</h2>)
        displayStops();
    }, []);

    return (
        <div className='body'>
            <h1 className='header'>Add Stops</h1>
            <div className='column'>
                <div>
                    <div><h4>{result}</h4></div>
                    <form>
                        <div className='form-group'>
                            <label>Custom Stop Location:</label>
                            <input
                                name='stopLoc'
                                className='form-control'
                                value={stopLoc}
                                type='text'
                                onChange={handleInputChange}
                            />
                            <button  className='button' onClick={handleSubmit}>Add Stop</button>
                        </div>
                    </form>
                </div>
                <div>
                    <button  className='button' onClick={displayStops}>Reload Stop Suggestions</button>
                    <a href="/myTrips">
                        <button className='button'>Back to My Trips</button>
                    </a>
                </div>
                <div>
                    {list}
                </div>
            </div>
        </div>
    );
}
