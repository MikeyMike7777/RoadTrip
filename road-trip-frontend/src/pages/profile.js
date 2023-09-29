import React, {useEffect, useState} from 'react';
import {checkStatus, logout} from "../components/logout";

export default function Profile() {

    const [nameF, setNameF] = useState();
    const [nameL, setNameL] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();

    function getInfo(){
        if (typeof window !== 'undefined') {
            let curEmail = sessionStorage.getItem("curEmail");
            let curF = sessionStorage.getItem("curF");
            let curL = sessionStorage.getItem("curL");
            let curPhone = sessionStorage.getItem("curPhone");

            setEmail(curEmail);
            setNameF(curF);
            setNameL(curL);
            setPhone(curPhone);
        }
    }

    useEffect(() => {
        if (!checkStatus())
            window.location.pathname='/';
        getInfo();
    },[]);

    return (
        <div className='body'>
            <h1 className='header'>Profile</h1>
            <div className='column'>
                <div>
                    <button  className='button' onClick={logout}>Logout</button>
                    <a href='/home'>
                        <button className='button'>Back</button>
                    </a>
                </div>
                <div>
                    <a href="/music">
                        <button className='button'>My Music</button>
                    </a>
                    <a href="/editAccount">
                        <button className='button'>Edit Account</button>
                    </a>
                </div>
                <div>
                    <div>Name: {nameF} {nameL}</div>
                    <div>Email: {email}</div>
                    <div>Phone: {phone}</div>
                </div>
            </div>
        </div>
    );
}

