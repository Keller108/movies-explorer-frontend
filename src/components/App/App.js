import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import api from '../../utils/api';
import * as auth from '../../utils/auth';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  const history = useHistory(); 

  useEffect(() => {
    tokenCheck()
  }, [loggedIn]);

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
        auth.getContent(jwt)
        .then((res) => {
            if (res) {
                history.push('/')
                setLoggedIn(true)
            } else {
                localStorage.removeItem('jwt')
            }
        })
        .catch(err => { 
            console.log(err);
            history.push('/signin');
        })
    }
  };

  useEffect(() => {
    if (loggedIn === true) {
        api.getInfo()
        .then((data) => {
            setCurrentUser(data)
        })
        .catch(err => console.log(err))
    }
  }, [loggedIn])

  function handleRegister ({name, email, password}) {
    return auth.register(name, email, password)
    .then((res) => {
        if (res) {
            history.push('/signin')
        } else {
            Promise.reject(`Ошибка ${res.status}`)
        }
    })
    .catch((err) => {
        console.log(err)
    })
  };

  function handleLogin ({email, password}) {
    return auth
    .authorize(email, password)
    .then((res) => {
        if (res.token) {
            localStorage.setItem('jwt', res.token)
            setLoggedIn(true)
            tokenCheck()
        }            
    })
    .catch(err => console.log(err))
  };

  function handleUpdateUser(userData) {
    api.updateInfo(userData)
    .then((data) => {
        setCurrentUser(data)
    })
    .catch(err => console.log(err));
  }

  function signOut() {
      localStorage.removeItem('jwt')
      setLoggedIn(false)
      history.push('/signin')
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
          <div className="page">
                <Switch>
                  <Route exact path="/">
                      <Main 
                        loggedIn={loggedIn}
                      />
                  </Route>
                  <ProtectedRoute 
                    exact path="/movies"
                    component={Movies}
                    loggedIn={loggedIn}
                  />
                  <ProtectedRoute 
                    exact path="/saved-movies"
                    component={SavedMovies}
                    loggedIn={loggedIn}
                  />
                  <ProtectedRoute 
                    exact path="/profile"
                    component={Profile}
                    loggedIn={loggedIn}
                    onProfileChange={handleUpdateUser}
                    onLogout={signOut}
                  />
                  <Route exact path="/signup">
                      <Register
                        onRegister={handleRegister}
                      />
                  </Route>
                  <Route exact path="/signin">
                      <Login
                        onLogin={handleLogin}
                      />
                  </Route>
                  <Route>
                    { loggedIn ? <Redirect to="/"/> : <Redirect to="/signin"/>}
                  </Route>
                  <Route exact path="*">
                      <NotFound />
                  </Route>
                </Switch>
          </div>
      </div>
    </CurrentUserContext.Provider>
  )
};

export default App;
