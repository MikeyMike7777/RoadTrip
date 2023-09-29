import React,{useState} from 'react';
import {saveTrip} from "../services/tripService";
import {checkStatus} from "../components/logout";

require('dotenv').config();

export default function AddTrip() {
    React.useEffect(() => {
        if (!checkStatus())
            window.location.pathname='/';
    },[]);

    const [tripName, setTripName] = useState('');
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

    async function handleSubmit(event) {
        event.preventDefault()
        let redirect = false;
        if(notSet()) {
            let email = '';
            if (typeof window !== 'undefined') {
                email = sessionStorage.getItem("curEmail");
                redirect = await saveTrip({email, tripName, startDate, startLoc, endLoc,
                    stopFreq, artistic, beauty, food, fun, historical,
                    landmarks, nature, water, setResult});
            }
        }

        setTimeout(holder => {
            console.log(redirect)
            if (redirect === true) {
                window.location.pathname = "/myTrips"
                console.log("attempted redirect")
            }
        }, 1500)
    }

    function redirectBack(event) {
        event.preventDefault();
        window.location.pathname = "/myTrips"
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

    return (
        <div className='body'>
            <h1 className='header'>Add Trip</h1>
            <div className='column'>
                <div>{result}</div>
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
                                value={artistic}
                                type='checkbox'
                                onChange={handleInputChange}
                            />
                            <label>  Beauty and Fashion:</label>
                            <input
                                name='beauty'
                                className='form-control'
                                value={beauty}
                                type='checkbox'
                                onChange={handleInputChange}
                            />
                            <label>  Food Experiences:</label>
                            <input
                                name='food'
                                className='form-control'
                                value={food}
                                type='checkbox'
                                onChange={handleInputChange}
                            />
                            <label>  Fun and Adventure:</label>
                            <input
                                name='fun'
                                className='form-control'
                                value={fun}
                                type='checkbox'
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Historical:</label>
                            <input
                                name='historical'
                                className='form-control'
                                value={historical}
                                type='checkbox'
                                onChange={handleInputChange}
                            />
                            <label>  Landmarks:</label>
                            <input
                                name='landmarks'
                                className='form-control'
                                value={landmarks}
                                type='checkbox'
                                onChange={handleInputChange}
                            />
                            <label> </label>
                            <label>  Nature and Outdoors:</label>
                            <input
                                name='nature'
                                className='form-control'
                                value={nature}
                                type='checkbox'
                                onChange={handleInputChange}
                            />
                            <label> </label>
                            <label>  Water Activities:</label>
                            <input
                                name='water'
                                className='form-control'
                                value={water}
                                type='checkbox'
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <button  className='button' onClick={handleSubmit}>Add Trip</button>
                    <button  className='button' onClick={redirectBack}>Back</button>
                </form>
            </div>
        </div>
    );
}