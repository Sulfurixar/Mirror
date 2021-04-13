import { useState } from "react";
import "./App.css";

import { BrowserRouter, Route, Switch } from 'react-router-dom';

//components
import ClockSwitch from "./components/ClockSwitch/ClockSwitch.js"
import Dashboard from './components/Dashboard/Dashboard.js';
import Preferences from './components/Preferences/Preferences.js';
import Login from './components/Login/Login.js';
import useToken from './components/App/useToken.js';
import AuthRoute from './components/App/AuthRoute.js'

function App() {

  const { token, setToken, flag } = useToken();
  const [ loggedIn, setLoggedIn ] = useState();

  return (
    <div className="App">
      <h1>Smart Mirror</h1>
      <BrowserRouter>
        <Switch>
          <Route path='/login'>
            <Login token={token} setToken={ setToken } flag={flag} setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
          </Route>
          <AuthRoute path="/dashboard" token={token} loggedIn={loggedIn} setLoggedIn={setLoggedIn} component={Dashboard} />
          <AuthRoute path="/" token={token} loggedIn={loggedIn} setLoggedIn={setLoggedIn} component={Dashboard} />
          <AuthRoute path="/preferences" token={token} loggedIn={loggedIn} setLoggedIn={setLoggedIn} component={Preferences} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

  export default App;
