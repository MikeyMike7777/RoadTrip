import React from 'react';

export default function TripRating(props) {
    const displayTrip = (props) => {
        const {trip} = props;

        if (trip.rating && trip.description) {
            return (
                    <div className='trip' key={trip.tripID}>
                        <h3>Rating: {trip.rating}</h3>
                        <h3>Description:</h3>
                        <p>{trip.description}</p>
                    </div>
            )
        } else {
            return (
                <div className='trip' key={trip.tripID}>
                    <h3>No rating yet!</h3>
                </div>
            )
        }
    }

    return (
        <>
            {displayTrip(props)}
        </>
    )
}