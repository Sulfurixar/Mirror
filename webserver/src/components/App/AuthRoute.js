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
                (loggedIn && loggedIn.res === 1) ? 
                ( <Component {...props} /> ) : (<Redirect to='/login'/>)
            }
        />
    );
}

export default Authroute