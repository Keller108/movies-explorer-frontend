import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory, useLocation } from 'react-router-dom';
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
import * as moviesApi from '../../utils/MoviesApi';
import * as api from '../../utils/MainApi';
import * as auth from '../../utils/auth';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);

  const pathname = useLocation();
  const history = useHistory(); 

  useEffect(() => {
    tokenCheck()
  }, []);

  // useEffect(() => {
  //   if (loggedIn === true) {
  //       moviesApi.getMovies() 
  //       .then((data) => {
  //           setCards(data)
  //           console.log(data)
  //       })         
  //       .catch(err => console.log(err)) 
  //   }
      
  // }, [loggedIn])
 
  function tokenCheck() {
    const jwt = localStorage.getItem('jwt')
    const movies = localStorage.getItem('movies')
    if (jwt) {
      if (movies) {
        const result = JSON.parse(movies);
        setCards(result);
      }
      auth.getContent(jwt)
      .then((res) => {
          if (res) {
            setUserData({
              name: res.name,
              email: res.email,
            })
            history.push(pathname.pathname)
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
    if (loggedIn) { 
        api.getInfo()
        .then((data) => {
            setCurrentUser(data)
            history.push('/');
        })
        .catch(err => console.log(err))
    }
  }, [loggedIn]);

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
        history.push('/')
    })
    .catch(err => console.log(err));
  }

  function signOut() {
      localStorage.removeItem('jwt')
      localStorage.removeItem('movies')
      setLoggedIn(false)
      setCards([]);
      history.push('/')
  };

  function handleSearchMovies(searchText) {
    setIsLoading(true)
    if (cards.length > 0) {
      const resMov = goSearch(cards, searchText)
      if (resMov.length > 0) {
        setIsNotFound(false)
      } else {
        setIsNotFound(true)
      }
    } else {
      moviesApi.getMovies()
      .then((data) => {
        setCards(data)
        localStorage.setItem('movies', JSON.stringify(data));
        const result = goSearch(data, searchText);
          if (result.length > 0) {
              setIsNotFound(false);
          }
          else {
            setIsNotFound(true);
          }
      })
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  function goSearch(list, searchText) {
    let result = [];
    list.forEach((movie) => {
      if(movie.nameRU.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
        result.push(movie)
      }
    })
    return result;
  }

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
                    cards={cards}
                    isLoading={isLoading}
                    onMoviesSearch={handleSearchMovies}
                  />
                  <ProtectedRoute 
                    exact path="/saved-movies"
                    component={SavedMovies}
                    loggedIn={loggedIn}
                  />
                  <ProtectedRoute 
                    exact path="/profile"
                    component={Profile}
                    userData={userData}
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
