import React, {useEffect, useState} from 'react';
import NotificationService, {useNotification} from "../services/notificationService";
import {fetchTripByID, updateTrip} from "../services/tripService";
import {fetchStopFreq, fetchStops} from "../services/stopService";
import {checkStatus, logout} from "../components/logout";

export default function MyTrips() {

    const [stops, setStops] = useState('');
    const [trip, setTrip] = useState();
    const [tripName, setTripName] = useState();
    const [startDate, setStartDate] = useState('');
    const [startLoc, setStartLoc] = useState('');
    const [endLoc, setEndLoc] = useState('');
    const [stopFreq, setStopFreq] = useState('');
    const [artistic, setArtistic] = useState(false);
    const [beauty, setBeauty] = useState(false);
    const [food, setFood] = useState(false);
    const [fun, setFun] = useState(false);
    const [historical, setHistorical] = useState(false);
    const [landmarks, setLandmarks] = useState(false);
    const [nature, setNature] = useState(false);
    const [water, setWater] = useState(false);
    const [result, setResult] = useState();
    let logoutButton, rateButton, backButton;

    const dispatch = useNotification();
    async function handleSubmit(event) {
        dispatch({
            type: "WARNING",
            message: "Please Wait as we process changes to your Trip.",
            title: "Trip Updating"
        })
        event.preventDefault()
        let redirect = false;
        if(notSet()) {
            let email = '';
            if (typeof window !== 'undefined') {
                email = sessionStorage.getItem("curEmail");
                let id = sessionStorage.getItem("curTrip")
                redirect = await updateTrip({email, id, tripName, startDate, startLoc, endLoc,
                    stopFreq, artistic, beauty, food, fun, historical,
                    landmarks, nature, water, setResult});
            }
        }
        setTimeout(holder => {
            console.log(redirect)
            if (redirect === true) {
                dispatch({
                    type: "SUCCESS",
                    message: "You may now change pages.",
                    title: "Update Complete"
                })
                console.log("attempted redirect")
            }
            else{
                dispatch({
                    type: "ERROR",
                    message: "We encountered a problem while updating your Trip." +
                             "\nPlease try again later.",
                    title: "Update Failed"
                })
            }
        }, 1500)
    }

    function resetForm(event) {
        event.preventDefault();
        displayTrip();
    }

    function handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        switch (name) {
            case 'tripName':
                setTripName(value)
                break;
            case 'startDate':
                setStartDate(value);
                break;
            case 'startLoc':
                setStartLoc(value);
                break;
            case 'endLoc':
                setEndLoc(value);
                break;
            case 'stopFreq':
                setStopFreq(value);
                break;
            case 'artistic':
                setArtistic(value);
                break;
            case 'beauty':
                setBeauty(value);
                break;
            case 'fun':
                setFun(value);
                break;
            case 'food':
                setFood(value);
                break;
            case 'historical':
                setHistorical(value);
                break;
            case 'landmarks':
                setLandmarks(value);
                break;
            case 'nature':
                setNature(value);
                break;
            case 'water':
                setWater(value);
                break;
        }
    }

    function notSet(){
        if (tripName == null || startDate == null || startLoc == null || endLoc == null || stopFreq == null)
            return false;
        if (tripName === '' || startDate === '' || startLoc === '' || endLoc === '' || stopFreq === '')
            return false;
        if (!artistic && !beauty && !food && !fun && !historical && !landmarks && !nature && !water) {
            setArtistic(true)
            setBeauty(true)
            setFood(true)
            setFun(true)
            setHistorical(true)
            setLandmarks(true)
            setNature(true)
            setWater(true)
        }
        return true;
    }

    async function displayStops() {
        let id = '';
        let result;
        if (typeof window !== 'undefined') {
            id = sessionStorage.getItem("curTrip");
            result = await fetchStops({id});
        } else {
            result = await fetchStops({id});
        }
        setStops(result);
    }

    async function displayTrip() {
        let id = '';
        let result;
        if (typeof window !== 'undefined') {
            id = sessionStorage.getItem("curTrip");
            result = await fetchTripByID({id, setTripName, setStartDate, setStartLoc, setEndLoc});
        } else {
            result = await fetchTripByID({id, setTripName, setStartDate, setStartLoc, setEndLoc});
        }
        setTrip(result);
        await fetchStopFreq(
            {id,
                setStopFreq,
                setArtistic,
                setWater,
                setNature,
                setBeauty,
                setFood,
                setFun,
                setHistorical,
                setLandmarks })
        console.log(fun);
    }

    useEffect(() => {
        displayTrip();
        setStops(<h3>Fetching your stops...</h3>)
        displayStops();
        if (!checkStatus()) {
            window.location.pathname='/'
        }
    }, []);

    return (
        <div className='body'>
            <h1 className='header'>{ tripName }</h1>
            <div>
                <header className="floating-panel"> <b>Mode of Travel: </b>
                    <select id="mode">
                        <option value="DRIVING">Driving</option>
                        <option value="WALKING">Walking</option>
                        <option value="BICYCLING">Bicycling</option>
                        <option value="TRANSIT">Transit</option>
                    </select>
                </header>
                <section className="map-canvas"></section>
                <aside className="output">
                    <h3>Distance</h3>
                    <b> {startLoc} --> {endLoc}: </b><span id={tripName}></span>
                    <div> Map Graphic Under Development </div>
                </aside>
            </div>
            <div className='column'>
                { trip }
                <header id="floating-panel"> <b>Edit Trip: </b>
                    <form>
                        <div className='form-group'>
                            <label>Trip Name:</label>
                            <input
                                name='tripName'
                                className='form-control'
                                value={tripName}
                                type='text'
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Departure Date:</label>
                            <input
                                name='startDate'
                                className='form-control'
                                value={startDate}
                                type='date'
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Starting Address:</label>
                            <input
                                name='startLoc'
                                className='form-control'
                                value={startLoc}
                                type='text'
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Destination Address:</label>
                            <input
                                name='endLoc'
                                className='form-control'
                                value={endLoc}
                                type='text'
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Stop Frequency (in hours):</label>
                            <input
                                name='stopFreq'
                                className='form-control'
                                value={stopFreq}
                                type='number'
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='form-group'>
                            <div>
                                <text>Stop Types:</text>
                            </div>
                            <div>
                                <label>Artistic:</label>
                                <input
                                    name='artistic'
                                    className='form-control'
                                    checked={artistic}
                                    type='checkbox'
                                    onChange={handleInputChange}
                                />
                                <label>  Beauty and Fashion:</label>
                                <input
                                    name='beauty'
                                    className='form-control'
                                    checked={beauty}
                                    type='checkbox'
                                    onChange={handleInputChange}
                                />
                                <label>  Food Experiences:</label>
                                <input
                                    name='food'
                                    className='form-control'
                                    checked={food}
                                    type='checkbox'
                                    onChange={handleInputChange}
                                />
                                <label>  Fun and Adventure:</label>
                                <input
                                    name='fun'
                                    className='form-control'
                                    checked={fun}
                                    type='checkbox'
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label>Historical:</label>
                                <input
                                    name='historical'
                                    className='form-control'
                                    checked={historical}
                                    type='checkbox'
                                    onChange={handleInputChange}
                                />
                                <label>  Landmarks:</label>
                                <input
                                    name='landmarks'
                                    className='form-control'
                                    checked={landmarks}
                                    type='checkbox'
                                    onChange={handleInputChange}
                                />
                                <label> </label>
                                <label>  Nature and Outdoors:</label>
                                <input
                                    name='nature'
                                    className='form-control'
                                    checked={nature}
                                    type='checkbox'
                                    onChange={handleInputChange}
                                />
                                <label> </label>
                                <label>  Water Activities:</label>
                                <input
                                    name='water'
                                    className='form-control'
                                    checked={water}
                                    type='checkbox'
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <button  className='button' onClick={handleSubmit}>Save</button>
                        <button  className='button' onClick={resetForm}>Reset</button>
                    </form>
                </header>
                <div>
                    <a href="/rateTrip">
                        <button className='button'>Rate Trip</button>
                    </a>
                    <a href="/myTrips">
                        <button className='button'>Back</button>
                    </a>
                </div>
                <div>
                    {stops}
                </div>
            </div>
        </div>
    );
}

