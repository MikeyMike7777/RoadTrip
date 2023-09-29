import React, {useState} from 'react';
import {cancelTrip} from "../services/tripService";

export default function TripList(props) {
    const displayTrips = (props) => {
        const {trips} = props;

        if (trips.length > 0) {
            return (
                trips.map((trip, index) => {

                    const [thisTrip, setThisTrip] = useState(
                        <div>
                            <h2>{trip.tripName}</h2>
                            <h3>{trip.startLoc} --> {trip.endLoc}</h3>
                            <a href='/tripInfo'>
                                <button className='button' onClick={storeTripID}>View Info</button>
                            </a>
                            <a href='/addStops'>
                                <button className='button' onClick={storeTripID}>Add Stops</button>
                            </a>
                            <a href='/rateTrip'>
                                <button className='button' onClick={storeTripID}>Rate Trip</button>
                            </a>
                            <div>
                                <button className='button' onClick={cancel}>Cancel Trip</button>
                            </div>
                        </div>
                    );

                    function storeTripID() {
                        sessionStorage.setItem("curTrip", trip.tripID)
                    }
                    async function cancel(){
                        setThisTrip(<h4>Trip canceled! Refreshing...</h4>)
                        let tripID = trip.tripID;
                        let refresh = await cancelTrip({tripID});
                        if (refresh)
                            window.location.pathname = "/myTrips"
                    }

                    return (
                        <div className='trip' key={trip.tripID}>
                            <hr />
                            { thisTrip }
                        </div>
                    )
                })
            )
        } else {
            return (<h3>No trips yet!</h3>)
        }
    }

    const list = displayTrips(props);

    return <div>{list}</div>
}