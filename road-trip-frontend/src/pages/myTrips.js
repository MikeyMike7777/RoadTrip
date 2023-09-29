import React, {useEffect, useState} from 'react';
import {fetchTrips} from "../services/tripService";
import {checkStatus, logout} from "../components/logout";

export default function MyTrips() {

    const displayTrips = async () => {
        let email = '';
        let result;
        if (typeof window !== 'undefined') {
            email = sessionStorage.getItem("curEmail");
            result = await fetchTrips({email});
        } else {
            result = await fetchTrips({email});
        }
        setList(result);
    }

    const [list, setList] = useState();

    useEffect(() => {
        if (!checkStatus())
            window.location.pathname='/';
        displayTrips();
    }, []);

    return (
        <div className='body'>
            <h1 className='header'>My Trips</h1>
            <div className='column'>
                <div>
                    <a href="/addTrip">
                        <button className='button'>Add Trip</button>
                    </a>
                    <a href="/home">
                        <button className='button'>Back</button>
                    </a>
                    <button  className='button' onClick={logout}>Logout</button>
                </div>
                <div>
                    {list}
                </div>
            </div>
        </div>
    );
}


