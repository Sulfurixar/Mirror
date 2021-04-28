import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'
import { Redirect, useHistory } from "react-router-dom"; 

import './Login.css';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    .then(data => data.json())
}


export default function Login( { token, setToken, flag, setLoggedIn, loggedIn} ) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    useEffect(() => {
        fetch('http://localhost:8080/handle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"token": token})
        }).then(response => response.json()).then(data => setLoggedIn(data))
    }, []);

    let history = useHistory();
    const handleSubmit = async e => {
        e.preventDefault();
        let un = Base64.stringify(sha256(username))
        let pw = Base64.stringify(sha256(password))
        const token = await loginUser({
            un,
            pw
        });
        setToken(token);
        history.push("/");
    }

    const errors = {
        1: <p>Invalid username or password supplied.</p>
    }

    let login
    if (loggedIn && loggedIn.res === 1) {
        login = <Redirect to='/'/>
    } else {
        login = (
            <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                <p>Username</p>
                <input type="text" name="username" onChange={e => setUserName(e.target.value)}/>
                </label>
                <label>
                <p>Password</p>
                <input type="password" name="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                { errors[flag] }
                </div>
                <div>
                <button type="submit">Submit</button>
                </div>
            </form>
            </div>
            )
    }

    return login
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}