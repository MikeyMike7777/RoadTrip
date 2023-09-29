import React, { useState } from 'react';
import {modifyUsers} from "../services/editAccountService";
import {checkStatus} from "../components/logout";

export default function RegPage() {
    React.useEffect(() => {
        if (!checkStatus())
            window.location.pathname='/';
    },[]);

    let [nameF, setNameF] = useState();
    let [nameL, setNameL] = useState();
    let [email, setEmail] = useState();
    let [phone, setPhone] = useState();
    let [password, setPassword] = useState();

    function handleSubmit(event) {
        var curEmail = sessionStorage.getItem("curEmail");
        var curF = sessionStorage.getItem("curF");
        var curL = sessionStorage.getItem("curL");
        var curPhone = sessionStorage.getItem("curPhone");
        var curPassword = sessionStorage.getItem("curPassword");

        event.preventDefault()

        if(email === '' || email == null){
            setEmail(curEmail);
            email = curEmail;
        }
        if(nameF === '' || nameF == null){
            setNameF(curF);
            nameF = curF;
        }
        if(nameL === '' || nameL == null){
            setNameL(curL);
            nameL = curL;
        }
        if(phone === '' || phone == null){
            setPhone(curPhone);
            phone = curPhone;
        }
        if(password === '' || password == null){
            setPassword(curPassword);
            password = curPassword;
        }
        modifyUsers({nameF, nameL, email, phone, password})

        sessionStorage.setItem("curF", nameF);
        sessionStorage.setItem("curL", nameL);
        sessionStorage.setItem("curPhone", phone);
        sessionStorage.setItem("curPassword", password);

        window.location.pathname = "/home"
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


    return (
        <div>
            <h1>Edit Account</h1>
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
                <a href="/profile">
                    <button onClick={handleSubmit}>Submit</button>
                </a>
            </form>
            <a href="/profile">
                <button>Back</button>
            </a>
        </div>
    )
}