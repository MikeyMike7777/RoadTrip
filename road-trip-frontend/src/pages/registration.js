import React, { useState } from 'react';
import registerUsers from '../services/registrationService.js';
import {loginUsers} from '../services/loginService.js';

require('dotenv').config();

function RegPage() {
    const [nameF, setNameF] = useState();
    const [nameL, setNameL] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setError] = useState();

    function handleSubmit(event) {
        const value = "Email already in use";
         event.preventDefault()
         if(notSet()) {
             loginUsers({email, password})
                 .then(data => {
                     if(data == ''){ //checks to see if an email already exists
                         registerUsers({nameF, nameL, email, phone, password})
                         sessionStorage.setItem("curEmail", email);
                         sessionStorage.setItem("curF", nameF);
                         sessionStorage.setItem("curL", nameL);
                         sessionStorage.setItem("curPhone", phone);
                         sessionStorage.setItem("curPassword", password);
                         sessionStorage.setItem("prevPage", window.location.pathname);
                         window.location.pathname = "/home"
                     }
                     else{
                         setError(value);
                         changeColor("red");
                     }
                 })
                 .catch(err => console.log(err))
         }
     }

    function handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        switch (name) {
            case 'nameF':
                setNameF(value);
                break;
            case 'nameL':
                setNameL(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'password':
                setPassword(value);
                break;
        }
    }

    function notSet(){
         if(nameF == null || nameL == null || email == null || phone == null || password == null){
             return false;
         }
        if(nameF == '' || nameL == '' || email == '' || phone == '' || password == ''){
            return false;
        }

         return true;
    }

    function changeColor(color){
        document.getElementById("errorID").style.color = color;
    }

    return (
        <div className='body'>
            <h1 className='header'>Registration</h1>
            <div className='column'>
                <form>
                    <div className='form-group'>
                        <label>First Name:</label>
                        <input
                            name='nameF'
                            className='form-control'
                            value={nameF}
                            type='text'
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Last Name:</label>
                        <input
                            name='nameL'
                            className='form-control'
                            value={nameL}
                            type='text'
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='form-group'>
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
                        <label>Phone Number:</label>
                        <input
                            name='phone'
                            className='form-control'
                            value={phone}
                            type='text'
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label>Password:</label>
                        <input
                            name='password'
                            className='form-control'
                            value={password}
                            type='password'
                            onChange={handleInputChange}
                        />
                    </div>
                    <div id="errorID">{errorMessage}</div>
                    <a href="/home">
                        <button className='button' onClick={handleSubmit}>Register</button>
                    </a>
                </form>
                <a href="/">
                    <button className='button'>Back</button>
                </a>
            </div>
        </div>
    )
}

export default RegPage