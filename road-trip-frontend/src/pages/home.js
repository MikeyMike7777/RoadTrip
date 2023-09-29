import React, {useState} from 'react';
import NotificationService, {useNotification} from "../services/notificationService";
import {logout} from "../components/logout";
import {checkStatus} from "../components/logout";
import axios from "axios";
import {cancelTrip, fetchTrips} from "../services/tripService";

export default function Home() {
    let [nameF, setNameF] = useState('');
    let [nameL, setNameL] = useState('');

    function getName(){
        if (typeof window !== 'undefined') {
            let curF = sessionStorage.getItem("curF");
            let curL = sessionStorage.getItem("curL");

            setNameF(curF);
            setNameL(curL);
        }
    }

    const dispatch = useNotification();
    async function handleLoginNotification(){
        dispatch({
            type:"SUCCESS",
            title: "Login Successful"
        })

    }

    async function handleEmailNotification(){
        let email = sessionStorage.getItem("curEmail");
        axios.post(`${process.env.ROAD_TRIP_API_URL}/notification/` + email +
            '+Login')
            .then(response => {
                console.log("Email Success: " + response.data);
                dispatch({
                    type: "SUCCESS",
                    message: "A Login notification has successfully been sent to you at: " + email,
                    title: "Email Sent"
                })
            })
            .catch(error => {
                console.error("Email Failed: " + error);
                dispatch({
                    type: "ERROR",
                    message: "We were unable to send a login notification to: " + email +
                        "\nPlease check to make sure your e-mail has been given correctly",
                    title: "Email Failed"
                })
            });
    }

    async function handleTripNotification() {
        let email = sessionStorage.getItem("curEmail");
        let result = await fetchTrips({email});
        let trips;

        console.log("Getting trips...")
        await axios.get(process.env.ROAD_TRIP_API_URL + '/trip/' + email)
            .then(response => {
                console.log(response.data)
                trips = response.data;
                if(trips.length > 0)
                {
                    trips.map((trip, index) => {
                        console.log(trip.startDate.toString())
                        let fullDate = new Date();

                        let checker = fullDate.getFullYear().toString() + "-";
                        checker += fullDate.getMonth() < 10 ? "0" + (fullDate.getMonth() + 1) + "-":
                                                                fullDate.getMonth() + "-";
                        checker += fullDate.getDate() < 10 ? "0" + fullDate.getDate():
                                                                fullDate.getDate();
                        console.log(fullDate.getFullYear());
                        console.log(fullDate.getDate());
                        console.log(fullDate.getMonth());
                        console.log(checker);
                        if(trip.startDate === checker)
                        {
                            dispatch({
                                type: "WARNING",
                                message: "You have an upcoming trip! " +
                                        "\nCheck the date for \"" + trip.tripName +"\"",
                                title: "Upcoming Trip"
                            });
                            return;
                        }
                    });
                }
            })
            .catch(error => {
                console.error(error);
                dispatch({
                    type: "ERROR",
                    message: "Could not get Trips from database.\nPlease try again later.",
                    title: "Connection Error"
                });
            });
    }

    React.useEffect(() => {
        if (!checkStatus())
            window.location.pathname='/';
        getName();
        if(sessionStorage.getItem("prevPage") === "/login")
        {
            sessionStorage.setItem("prevPage", "");
            handleLoginNotification();
            handleEmailNotification();
        }
        else if(sessionStorage.getItem("prevPage") === "/registration")
        {
            sessionStorage.setItem("prevPage", "");
            handleLoginNotification();
            handleEmailNotification();
        }
        handleTripNotification();

    },[]);

    if(!checkStatus()){
        logout();
    }

    return (
        <div className='body'>
            <h1 className='header'>Home</h1>
            <div className='column'>
                <div>
                    <div>Welcome {nameF} {nameL}</div>
                    {NotificationService()}
                </div>
                <div>
                    {" "}
                    <a href="/myTrips">
                        <button className='button'>My Trips</button>
                    </a>
                </div>
                <div>
                    {" "}
                    <a href="/profile">
                        <button className='button'>My Profile</button>
                    </a>
                </div>
                <div>
                    {" "}
                    <a href="/musicRecommendations">
                        <button className='button'>Recommend Music</button>
                    </a>
                </div>
                <div>
                    {" "}
                    <button  className='button' onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    );
}

