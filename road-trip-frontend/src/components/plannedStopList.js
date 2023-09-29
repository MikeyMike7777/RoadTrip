import React, {useState} from 'react';
import {removeStop} from "../services/stopService";

export default function PlannedStopList(props) {
    const mapStops = (props) => {
        let {stops} = props;

        if (stops !== null && stops.length > 0) {

            return (
                stops.map((stop, index) => {

                    const [message, setMessage] = useState(
                        <div>
                            <h4>{stop.name}</h4>
                            <p>{stop.location.address1}</p>
                            <p>{stop.location.city}, {stop.location.state} {stop.location.zip_code}</p>
                            <p>See {stop.name} on <a href={stop.url}>Yelp!</a></p>
                            <button className='button' onClick={deleteStop}>Remove Stop</button>
                        </div>
                    )

                    async function deleteStop() {
                        let id = '';
                        id = stop.stopID;
                        let refresh = await removeStop({id});
                        if (refresh)
                            setMessage(<h4>Stop Removed!</h4>)
                    }

                    return (
                        <div className='stop' key={stop.id}>
                            <hr />
                            { message }
                        </div>
                    )
                })
            )
        } else {
            return (<h3>No stops planned yet!</h3>)
        }
    }

    let list = mapStops(props);

    return <div>{list}</div>;
}