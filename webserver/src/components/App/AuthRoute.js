import React, { useState, useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'

const Authroute = ({component: Component, token, loggedIn, setLoggedIn, ...rest}) => {
    
    useEffect(() => {
        fetch('http://localhost:8080/handle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"token": token})
        }).then(response => response.json()).then(data => setLoggedIn(data))
    }, []);

    return (
        <Route 
            {...rest}
            render={props=>
                (!token || token === '' || (loggedIn && loggedIn.res === 0)) ? 
                (<Redirect to='/login'/>) : ( <Component {...props} /> )
            }
        />
    );
}

export default Authroute