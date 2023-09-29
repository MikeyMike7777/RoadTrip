import axios from 'axios';
import React,{useState} from "react";
import TripRating from "../components/tripRating";
import TripList from "../components/tripList";

export async function saveTrip(props) {
    const sLoc = props.startLoc;
    const eLoc = props.endLoc;
    let message;
    let result;
    let err = false;

    await axios.get(process.env.ROAD_TRIP_API_URL + '/locationSearch/' +
        sLoc + '/' + eLoc)
        .then(response => {
            console.log(response.data);
            message = response.data;
        })
        .catch(error => {
            console.error(error);
            err = true;
        });

    if (message.at(0) !== '3') {
        if (message.at(0) === '1') {
            props.setResult(<h4 style={{color: 'red'}}>{message.at(2)}</h4>)
        } else {
            props.setResult(<h4 style={{color: 'red'}}>{message.at(1)}</h4>)
        }
    } else if (!err) {
        await axios.get(process.env.ROAD_TRIP_API_URL + '/directions/' +
            message.at(1) + '/' + message.at(2))
            .then(response => {
                console.log(response.data);
                result = response.data;
            })
            .catch(error => {
                console.error(error);
                err = true;
            });

        if (!err) {
            const data = {
                email: props.email,
                tripName: props.tripName,
                startDate: props.startDate,
                startLoc: message.at(1),
                endLoc: message.at(2),
                tripTime: result.routes.at(0).legs.at(0).duration.value,
                tripDist: result.routes.at(0).legs.at(0).distance.value
            }

            await axios.post(process.env.ROAD_TRIP_API_URL + '/trip', data)
                .then(response => {
                    console.log(response.data);
                    result = response.data;
                })
                .catch(error => {
                    console.error(error);
                    err = true;
                });
        }

        if (!err) {
            const stops = {
                tripID: result.tripID,
                stopFreq: props.stopFreq,
                artistic: props.artistic,
                beauty: props.beauty,
                food: props.food,
                fun: props.fun,
                historical: props.historical,
                landmarks: props.landmarks,
                nature: props.nature,
                water: props.water
            }

            await axios.post(process.env.ROAD_TRIP_API_URL + '/stops', stops)
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.error(error);
                    err = true;
                })
        }

        if (!err) {
            props.setResult(<h4>Trip Added! Redirecting...</h4>);
            return true;
        } else {
            props.setResult(<h4 style={{color: 'red'}}>Error! Please try again.</h4>);
            return false;
        }
    }
}

export async function updateTrip(props) {
    const sLoc = props.startLoc;
    const eLoc = props.endLoc;
    let message;
    let result;
    let err = false;

    await axios.get(process.env.ROAD_TRIP_API_URL + '/locationSearch/' +
        sLoc + '/' + eLoc)
        .then(response => {
            console.log(response.data);
            message = response.data;
        })
        .catch(error => {
            console.error(error);
            err = true;
        });

    if (message.at(0) !== '3') {
        if (message.at(0) === '1') {
            props.setResult(<h4 style={{color: 'red'}}>{message.at(2)}</h4>)
        } else {
            props.setResult(<h4 style={{color: 'red'}}>{message.at(1)}</h4>)
        }
    } else if (!err) {
        await axios.get(process.env.ROAD_TRIP_API_URL + '/directions/' +
            message.at(1) + '/' + message.at(2))
            .then(response => {
                console.log(response.data);
                result = response.data;
            })
            .catch(error => {
                console.error(error);
                err = true;
            });

        if (!err) {
            const data = {
                tripID: props.id,
                email: props.email,
                tripName: props.tripName,
                startDate: props.startDate,
                startLoc: message.at(1),
                endLoc: message.at(2),
                tripTime: result.routes.at(0).legs.at(0).duration.value,
                tripDist: result.routes.at(0).legs.at(0).distance.value
            }

            await axios.post(process.env.ROAD_TRIP_API_URL + '/trip', data)
                .then(response => {
                    console.log(response.data);
                    result = response.data;
                })
                .catch(error => {
                    console.error(error);
                    err = true;
                });
        }

        await axios.get(process.env.ROAD_TRIP_API_URL + '/stops/', props.tripID)
            .then(response => {
                console.log(response.data)
                result = response.data;
            })
            .catch(error => {
                console.error(error);
                err = true;
            })

        if (!err) {
            const stops = {
                stopFreqID: result.stopFreqID,
                tripID: props.tripID,
                stopFreq: props.stopFreq,
                artistic: props.artistic,
                beauty: props.beauty,
                food: props.food,
                fun: props.fun,
                historical: props.historical,
                landmarks: props.landmarks,
                nature: props.nature,
                water: props.water
            }

            await axios.post(process.env.ROAD_TRIP_API_URL + '/stops', stops)
                .then(response => {
                    console.log(response.data)
                })
                .catch(error => {
                    console.error(error);
                    err = true;
                })
        }

        if (!err) {
            props.setResult(<h4>Trip Added! Redirecting...</h4>);
            return true;
        } else {
            props.setResult(<h4 style={{color: 'red'}}>Error! Please try again.</h4>);
            return false;
        }
    }
}

export function rateTrip(props) {
    console.log("Rating Trip...")
    const data = {
        tripID: props.id,
        rating: props.rating,
        description: props.description
    }
    axios.post(process.env.ROAD_TRIP_API_URL + '/rateTrip', data)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}

export async function fetchTrips(props) {
    let trips;

    console.log("Getting trips...")
    await axios.get(process.env.ROAD_TRIP_API_URL + '/trip/' + props.email)
        .then(response => {
            console.log(response.data)
            trips = response.data;
            return trips;
        })
        .catch(error => {
            console.error(error);
        });

    return (<TripList trips={trips}/>);
}

export async function fetchTripsByName(props) {
    let trips;

    console.log("Getting trips...")
    await axios.get(process.env.ROAD_TRIP_API_URL + '/trip/name/' + props.tripName)
        .then(response => {
            console.log(response.data)
            trips = response.data;
            return trips;
        })
        .catch(error => {
            console.error(error);
        });

    return (<TripList trips={trips}/>);
}

export async function fetchTripByID(props) {
    let trip;

    console.log("Getting trip...")
    await axios.get(process.env.ROAD_TRIP_API_URL + '/rateTrip/'
        + props.id)
            .then(response => {
                console.log(response.data);
                trip = response.data;
                return trip;
            })
            .catch (error => {
                console.error(error);
            })
    props.setTripName(trip.tripName)
    props.setStartDate(trip.startDate)
    props.setStartLoc(trip.startLoc)
    props.setEndLoc(trip.endLoc)
    return <TripRating trip={trip}/>
}

export async function cancelTrip(props){
    console.log("canceling trip...")
    let redirect = true;
    await axios.delete(process.env.ROAD_TRIP_API_URL + '/stop/cancel/' + props.tripID)
        .then(response => {
            console.log(response.data);
            if (!response.data)
                redirect = false;
        })
        .catch(error => {
            console.error(error);
            redirect = false;
        })
    await axios.delete(process.env.ROAD_TRIP_API_URL + '/trip/cancel/' + props.tripID)
        .then(response => {
            console.log(response.data);
            if (!response.data)
                redirect = false;
        })
        .catch(error => {
            console.error(error);
            redirect = false;
        })
    return redirect;
}