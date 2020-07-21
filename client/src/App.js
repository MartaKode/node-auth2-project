import React, { useState, useEffect } from 'react';

import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import SingUp from './components/SignUp';
import SingIn from './components/SignIn';
import UsersList from './components/UsersList';
import PrivateRoute from './components/PrivateRoute';


function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setUserLoggedIn(true)
    }
  }, [userLoggedIn])

  const logout = () => {

    if (userLoggedIn) {
      alert('Logging out!')
      localStorage.removeItem('token')
      setUserLoggedIn(false)
    }

  }

  const alertUsers = () => {
    if(!localStorage.getItem('token')){
      alert('Must sign in to access users')
    }
  }

  return (
    <div className="App">
      {/* Links: */}
      <nav>
        <Link to='/users' onClick={alertUsers}>Users</Link>

        <Link to='/signup'>Sing Up!</Link>

        <Link to='/signin' onClick={logout}>{userLoggedIn ? 'Logout' : 'Sign In!'} </Link>
      </nav>

      {/* Routes: */}
      <Switch>
        <Route path='/signup' component={SingUp} />

        <Route path='/signin' component={SingIn} />

        <PrivateRoute  exact path='/users' component={UsersList} />

      </Switch>

    </div>
  );
}

export default App;
