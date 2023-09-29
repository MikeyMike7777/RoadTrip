import axios from 'axios';
import React from "react";
import StopList from "../components/stopList";
import PlannedStopList from "../components/plannedStopList";
import {useNotification} from "./notificationService";

export async function findStops(props) {
    let start, end;
    let lats = '', lons = '';
    let types = '';
    let freq;
    let stops, tripStops;

    console.log("Getting stops...")

    await axios.get(process.env.ROAD_TRIP_API_URL + '/rateTrip/' + props.id)
        .then(response => {
            console.log(response.data);
            start = response.data.startLoc;
            end = response.data.endLoc;
        })
        .catch(error => {
            console.error(error);
        });

    await axios.get(process.env.ROAD_TRIP_API_URL + '/stops/' + props.id)
        .then(response => {
            console.log(response.data);
            if (response.data.artistic)
                types += 'artistic+';
            if (response.data.beauty)
                types += 'beauty+';
            if (response.data.food)
                types += 'food+';
            if (response.data.fun)
                types += 'fun+';
            if (response.data.historical)
                types += 'historical+';
            if (response.data.landmarks)
                types += 'landmarks+';
            if (response.data.nature)
                types += 'nature+';
            if (response.data.water)
                types += 'water';
            console.log(types);
            freq = response.data.stopFreq * 3600;
        })
        .catch(error => {
            console.error(error);
        });

    await axios.get(process.env.ROAD_TRIP_API_URL + '/directions/' +
        start + '/' + end)
        .then(response => {
            console.log(response.data);
            let legs = response.data.routes.at(0).legs;
            console.log(legs);
            let curTime = 0;
            for (let i = 0; i < legs.length; ++i) {
                let leg = legs.at(i);
                if (leg.duration.value > freq / 1.5 ||
                    curTime + leg.duration.value > freq / 1.5) {
                    for (let j = 0; j < leg.steps.length; ++j) {
                        let step = leg.steps.at(j);
                        if (step.duration.value > freq / 1.2) {
                            if (curTime > freq / 4) {
                                lats += step.start_location.lat + '+';
                                lons += step.start_location.lng + '+';
                            }
                            lats += step.end_location.lat + '+';
                            lons += step.end_location.lng + '+';
                            console.log(curTime);
                            curTime = 0;
                        }
                        else if (curTime + step.duration.value > freq) {
                            lats += step.end_location.lat + '+';
                            lons += step.end_location.lng + '+';
                            console.log(curTime);
                            curTime = 0;
                        }
                        else {
                            curTime += step.duration.value;
                        }
                    }
                }
                else {
                    curTime += leg.duration.value;
                }
            }
        })
        .catch(error => {
            console.error(error);
        })

    await axios.get(process.env.ROAD_TRIP_API_URL + '/findStop/' + types +
        '/' + lats + '/' + lons)
        .then(response => {
            console.log(response.data);
            stops = response.data;
        })
        .catch(error => {
            console.error(error);
        });

    await axios.get(process.env.ROAD_TRIP_API_URL +
        '/fetchStops/' + props.id)
        .then(response => {
            console.log(response.data);
            tripStops = response.data;
        })
        .catch(error => {
            console.error(error);
        })

    console.log(stops.length)

    for (let s = 0; s < stops.length; ++s) {
        for (let t = 0; t < tripStops.length; ++t) {
            if (tripStops.at(t).id === stops.at(s).id) {
                stops.splice(s, 1);
                --s;
                break;
            }
        }
    }

    console.log(stops.length)

    return (<StopList stops={stops}/>);
}

export async function storeStop(props) {
    const stop = {
        latitude: props.lat,
        longitude: props.lon,
        name: props.name,
        tripID: props.id
    }

    await axios.post(process.env.ROAD_TRIP_API_URL + '/storeStop', stop)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}

export async function fetchStops(props) {
    let stops;
    await axios.get(process.env.ROAD_TRIP_API_URL +
        '/fetchStops/' + props.id)
        .then(response => {
            console.log(response.data);
            stops = response.data;
        })
        .catch(error => {
            console.error(error);
        })

    return (<PlannedStopList stops={stops}/>);
}

export async function removeStop(props) {
    let redirect = true;

    await axios.post(process.env.ROAD_TRIP_API_URL + '/removeStop/' + props.id)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.error(error);
            redirect = false;
        })
    return redirect;
}

export async function fetchStopFreq(props)
{
    let types = '';
    let freq;
    await axios.get(process.env.ROAD_TRIP_API_URL + '/stops/' + props.id)
        .then(response => {
            console.log(response.data);
            if (response.data.artistic)
                types += 'artistic+';
            if (response.data.beauty)
                types += 'beauty+';
            if (response.data.food)
                types += 'food+';
            if (response.data.fun)
                types += 'fun+';
            if (response.data.historical)
                types += 'historical+';
            if (response.data.landmarks)
                types += 'landmarks+';
            if (response.data.nature)
                types += 'nature+';
            if (response.data.water)
                types += 'water';
            console.log(types);
            freq = response.data.stopFreq;
        })
        .catch(error => {
            console.error(error);
        });
    props.setStopFreq(freq);
    props.setArtistic(types.includes("artistic"));
    props.setBeauty(types.includes("beauty"));
    props.setFood(types.includes("food"));
    props.setFun(types.includes("fun"));
    props.setHistorical(types.includes("historical"));
    props.setLandmarks(types.includes("landmarks"));
    props.setNature(types.includes("nature"));
    props.setWater(types.includes("water"));
}