import React from 'react';
import {storeStop} from "../services/stopService";
import AddStops from "../pages/addStops";

export default function StopList(props) {
    const displayStops = (props) => {
        const {stops} = props;

        if (stops !== undefined && stops.length > 0) {
            return (
                stops.map((stop, index) => {

                    const [message, setMessage] = useState(
                        <div>
                            <h2>{stop.name}</h2>
                            <p>{stop.location.address1}</p>
                            <p>{stop.location.city}, {stop.location.state} {stop.location.zip_code}</p>
                            <p>Check out {stop.name} on <a href={stop.url}>Yelp!</a></p>
                            <button className='button' onClick={addStop}>Add Stop</button>
                        </div>
                    );

                    async function addStop() {
                        let id = '';
                        let lat = stop.coordinates.latitude;
                        let lon = stop.coordinates.longitude;
                        let name = stop.name;
                        if (typeof window !== 'undefined') {
                            id = sessionStorage.getItem("curTrip");
                            await storeStop({lat, lon, name, id});
                        } else {
                            console.log("Null TripID")
                            await storeStop({lat, lon, name, id});
                        }
                        setMessage(<h4>Stop Added!</h4>);
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
            return (<h3>No stops found!</h3>)
        }
    }

    const list = displayStops(props);

    return <div>{list}</div>
}