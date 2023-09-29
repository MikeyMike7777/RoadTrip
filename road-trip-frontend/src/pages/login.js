import React, {useState} from 'react';
import {loginUsers} from '../services/loginService.js';
import {validatePassword} from '../services/loginService.js';
import {useNotification} from "../services/notificationService";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setError] = useState();

    const dispatch = useNotification();
    async function handleLoginNotification(){

        dispatch({
            type:"SUCCESS",
            title: "Login Successful"
        })

    }

    function handleSubmit(event) {
        const value = "Invalid email or password";
        event.preventDefault()
        if(notSet()) {
            loginUsers({email})
                .then(data => {
                    if(data !== ''){
                        validatePassword({email, password})
                            .then(data2 => {
                                if(data2 !== false){
                                    sessionStorage.setItem("curEmail", data.email);
                                    sessionStorage.setItem("curF", data.firstName);
                                    sessionStorage.setItem("curL", data.lastName);
                                    sessionStorage.setItem("curPhone", data.phone);
                                    sessionStorage.setItem("curPassword", data.password);
                                    sessionStorage.setItem("prevPage", window.location.pathname);
                                    {handleLoginNotification()}
                                    window.location.pathname = "/home"
                                }
                                else{
                                    setError(value);
                                    changeColor("red");
                                }
                            })
                        .catch(err => console.log(err))
                    }
                    else{
                        setError(value);
                        changeColor("red");
                    }
                })
    .catch(err => console.log(err))
        }
        else{
            setError("");
        }
    }

    function handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
        }

    }

    function notSet(){
        if(email == null || password == null){
            return false;
        }
        return !(email === '' || password === '');


    }

    function changeColor(color){
        document.getElementById("errorID").style.color = color;
    }

    return (
        <div className = "body">
            <h1 className = "header">Login</h1>
            <form className = "column">
                <div className='form-group'>
                    {" "}
                    <label>Email:</label>
                    <input
                        name='email'
                        className='form-control'
                        value={email}
                        type='text'
                        onChange={handleInputChange}
                    />
                </div>
                <div className='form-group'>
                    {" "}
                    <label>Password:</label>
                    <input
                        name='password'
                        className='form-control'
                        value={password}
                        type='password'
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <a href="/home">
                        <button className = "button" onClick={handleSubmit}>Login</button>
                    </a>
                </div>
                <div id="errorID">{errorMessage}</div>
            </form>
            <a href="/">
                <button className = "button">Back</button>
            </a>
        </div>
    );
};
