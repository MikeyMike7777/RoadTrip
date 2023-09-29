import React, {useState} from 'react';
import {fetchTripsByName} from "../services/tripService";

export default function searchTrips(){
    const [tripName, setTrip] = useState();
    const [list, setList] = useState();

    const displayTrips = async () => {
        let result;
        if (typeof window !== 'undefined') {
            result = await fetchTripsByName({tripName});
        } else {
            result = await fetchTripsByName({tripName});
        }
        setList(result);
    }

    function handleSubmit(event) {
        event.preventDefault();
        displayTrips();
    }

    function handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        switch (name) {
            case 'tripName':
                setTrip(value);
                break;
        }

    }

    return (
        <div className = "body">
            <div className = "column">
                <form className = "column">
                    <div className='form-group'>
                        {" "}
                        <label>Find Trip:</label>
                        <input
                            name='tripName'
                            className='form-control'
                            value={tripName}
                            type='text'
                            onChange={handleInputChange}
                        />
                    </div>
                </form>
                <div>
                    <button className = "button" onClick={handleSubmit}>Submit</button>
                </div>
                <a href="/">
                    <button className = "button">Back</button>
                </a>
            </div>
            <div>
                {list}
            </div>
        </div>
    );
};