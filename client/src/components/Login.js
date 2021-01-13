import React, { useState, useCallback, Fragment } from "react";
import { Redirect } from 'react-router-dom';
import { login } from "../redux/actions/userActions";
import { useDispatch } from "react-redux";

const initLogin = {
    username: "",
    password: ""
};

function Login(props) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [loginCreds, setLogin] = useState(initLogin);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginCreds));
    };
    const handleChange = useCallback(
        (event) => {
            const { name, value, type, checked } = event.target;
            const valueToUse = type === "checkbox" ? checked : value;
            setLogin({
                ...loginCreds,
                [name]: valueToUse,
            });
        },
        [loginCreds]
    );
    return (

        <div className='loginContainer'>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type='text'
                    name='username'
                    value={loginCreds.username}
                    onChange={handleChange}
                />
                <input
                    type='password'
                    name='password'
                    value={loginCreds.password}
                    onChange={handleChange}
                />
                <input type="submit" />
            </form>
            {localStorage.getItem('token') && <Redirect to="/dashboard" />}
        </div>

    );
}


export default (Login);