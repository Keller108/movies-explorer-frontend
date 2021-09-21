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
import * as MoviesApi from '../../utils/MoviesApi';
import * as MainApi from '../../utils/MainApi';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [isFilteredCards, setIsFilteredCards] = useState(false);
  const [filteredCards, setFilteredCards] = useState([]);
  const [filteredShortTimeCards, setFilteredShortTimeCards] = useState([]);
  const [savedFilteredCards, setSavedFilteredCards] = useState([]);
  const [savedFilteredShortTimeCards, setSavedFilteredShortTimeCards] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isServerError, setIsServerError] = useState(false);
  const [profileText, setProfileText] = useState('');
  const [registerText, setRegisterText] = useState('');
  const [loginText, setLoginText] = useState('');

  const pathname = useLocation();
  const history = useHistory(); 
 
  // КЛИЕНТСКАЯ ЧАСТЬ //

  useEffect(() => {
    tokenCheck()
  }, []);

  useEffect(() => {
    if (loggedIn) { 
      MoviesApi.getInfo()
        .then((data) => {
            setCurrentUser(data)
        })
        .catch(err => console.log(err))
    }
  }, [loggedIn]);

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    const movies = localStorage.getItem('movies');
    const savedMovies = localStorage.getItem('savedMovies');
    if (jwt) {
      if (movies) {
        const result = JSON.parse(movies);
        setCards(result);
      }
      if (savedMovies) {
        const savedResult = JSON.parse(savedMovies);
        setSavedCards(savedResult);
        setSavedFilteredCards(savedResult);
      }
      history.push('/movies');
      MoviesApi.getContent(jwt)
      .then((res) => {
          if (res) {
            setUserData({
              name: res.name,
              email: res.email,
            })
            setLoggedIn(true)
          } else {
              localStorage.removeItem('jwt')
          }
      })
      .catch((err) => { 
          setIsServerError(true);
          setProfileText('Не удалось загрузить данные');
      });
    };
  };

  function handleRegister ({name, email, password}) {
    return MoviesApi.register(name, email, password)
    .then((res) => {
        if (res) {
          handleLogin({email, password})
        } else {
            Promise.reject(`Ошибка ${res.status}`)
        }
    })
    .catch((err) => {
      setRegisterText('Что-то пошло не так =(');
      if (err === 400) return setRegisterText('Некорректно заполнено одно из полей.');
      if (err === 409) return setRegisterText('Такой пользователь уже существует!');
    });
  };

  function handleLogin ({email, password}) {
    return MoviesApi.authorize(email, password)
      .then((res) => {
        if (res.token) {
            localStorage.setItem('jwt', res.token);
            setLoggedIn(true);
            history.push('/movies')
            tokenCheck();
            MoviesApi.getSavedMovies()
              .then((movies) => {
                setSavedCards(movies);
                setSavedFilteredCards(movies);
                localStorage.setItem('savedMovies', JSON.stringify(movies));
              })
              .catch(err => console.log(err));
      }            
    })
    .catch(err => {
      if (err === 400) return setLoginText('Не заполнено одно из полей.');
      if (err === 401) return setLoginText('Пользователь с такиим email не найден.');
      setLoginText('Где-то ошибка. Попробуйте еще раз.');
      console.log(err);
    });
  };

  function handleUpdateUser(userData) {
    MoviesApi.updateInfo(userData)
    .then((data) => {
        setCurrentUser(data)
        history.push(pathname.pathname)
        setProfileText('Профиль успешно обновлен.');
    })
    .catch((err) => {
      console.log(err);
      setProfileText('При обновлении профиля произошла ошибка.');
    });
  }

  function signOut() {
      localStorage.removeItem('jwt');
      localStorage.removeItem('movies');
      localStorage.removeItem('savedMovies')
      setLoggedIn(false);
      setCards([]);
      setSavedCards([]);
      setFilteredCards([]);
      setSavedFilteredCards([]);
      setFilteredShortTimeCards([]);
      setSavedFilteredShortTimeCards([]);
      history.push('/');
  };

  // ПОИСК ФИЛЬМОВ //

  function handleSearchMovies(value) {
    setIsServerError(false);
    setIsLoading(true)
    if (cards.length > 0) {
      const result = goSearch(cards, value)
      if (result.length > 0) {
        setIsNotFound(false)
      } else {
        setIsNotFound(true)
      }
      setFilteredCards(result);
    } else {
      MainApi.getMovies()
      .then((data) => {
        setCards(data)
        localStorage.setItem('movies', JSON.stringify(data));
        const result = goSearch(data, value);
          if (result.length > 0) {
              setIsNotFound(false);
          } else {
            setIsNotFound(true);
          }
          setFilteredCards(result);
          if (isFilteredCards) {
            const resultShortTimeFilter = searchFilterTime(result);
            if (resultShortTimeFilter.length > 0) {
              setIsNotFound(false);
            } else {
              setIsNotFound(true);
            }
            setFilteredShortTimeCards(resultShortTimeFilter);
          }
      })
      .catch((err) => { 
        setIsServerError(true)
      });
    }
    
    setTimeout(() => {
      setIsLoading(false);
    }, 900);
  }

  // ПОИСК СОХРАНЕННЫХ ФИЛЬМОВ //

  function searchSavedToBundleMovies(value) {
    if (savedCards.length > 0) {
      setSavedFilteredCards(goSearch(savedCards, value));
    } else {
      setIsLoading(true);
      MoviesApi.getSavedMovies()
        .then((res) => {
          setSavedCards(res);
          localStorage.setItem('savedMovies', JSON.stringify(res));
          setSavedFilteredCards(goSearch(savedCards, value));
        })
        .catch(err => console.log(err));

      setTimeout(() => {
        setIsLoading(false);
      }, 900);  
    };
  };

  function filterMoviesById(moviesList, id) {
    return moviesList.filter((movie) => { return movie._id !== id});
  };

    // СОХРАНЕНИЕ ФИЛЬМОВ //

  function saveMovieToBundle(movie) {
    setIsLoading(true);
      MoviesApi.saveMovie({movie})
        .then((res) => {
          const movies = [...savedCards, res];
          localStorage.setItem('savedMovies', JSON.stringify(movies));
          setSavedCards(i => [...i, res]);
          if (isFilteredCards) {
              setSavedFilteredCards(i => [...i, res]);
              setSavedFilteredShortTimeCards(i => [...i, res]);
          } else {
            setSavedFilteredCards(i => [...i, res]);
        }
      })
      .catch((err) => { 
        setIsServerError(true)
      });

    setTimeout(() => {
      setIsLoading(false);
    }, 900);
  };

  // УДАЛЕНИЕ ФИЛЬМОВ //

  function deleteMovieFromBundle(id) {
    setIsLoading(true);
    MoviesApi.deleteMovie({id})
      .then(() => {
        const result = filterMoviesById(savedCards, id);
        setSavedCards(result);
        localStorage.setItem('savedMovies', JSON.stringify(result));
        setSavedFilteredShortTimeCards(filterMoviesById(savedFilteredShortTimeCards, id));
        setSavedFilteredCards(filterMoviesById(savedFilteredCards, id));
      })
      .catch((err) => { 
        setIsServerError(true)
      });

    setTimeout(() => {
      setIsLoading(false);
    }, 900);
  };

  // ФИЛЬТРОВАНИЕ КАРТОЧЕК (ПО ВРЕМЕНИ И Т.Д.) //
  
  function goSearch(list, searchText) {
    let result = [];
    list.forEach((movie) => {
        if (movie.nameRU.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
            result.push(movie);
        }
    });
    return result;
  };

  function searchFilterTime(list) {
    let result = [];
    list.forEach((card) => {
        if (card.duration <= 40) {
            result.push(card);
        }
    });
    return result;
  };

  function switchFilter() {
    setIsFilteredCards(!isFilteredCards)
  };

  function clearingErrors() {
    setIsNotFound(false);
    setProfileText('');
    setRegisterText('');
    setLoginText('');
  }

  useEffect(() => {
    setIsNotFound(false);
    if (isFilteredCards) {
        if (pathname.pathname === "/movies") {
            if (cards.length > 0) {
                const result = searchFilterTime(filteredCards);
                if (result.length > 0) {
                    setIsNotFound(false);
                }
                else {
                    setIsNotFound(true);
                }
                setFilteredShortTimeCards(result);
            }
        }
    } else if (pathname.pathname === "/saved-movies") {
        const result = searchFilterTime(savedFilteredCards);
        if (result.length > 0) {
            setIsNotFound(false);
        }
        else {
            setIsNotFound(true);
        }
        setSavedFilteredShortTimeCards(result);
      }
  }, [isFilteredCards]);

  useEffect(() => {
    if (pathname === '/saved-movies') {
      setSavedFilteredCards(savedCards)
    }
  })
 
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
                    isFilteredCards={isFilteredCards}
                    cards={isFilteredCards ? filteredShortTimeCards : filteredCards}
                    savedCards={savedCards}
                    isLoading={isLoading}
                    onMoviesSearch={handleSearchMovies}
                    setFilter={switchFilter}
                    isNotFound={isNotFound}
                    saveMovieToBundle={saveMovieToBundle}
                    deleteMovieFromBundle={deleteMovieFromBundle}
                    onSavedMoviesSearch={searchSavedToBundleMovies}
                    clearingErrors={clearingErrors}
                    isServerError={isServerError}
                  />
                  <ProtectedRoute 
                    exact path="/saved-movies"
                    component={SavedMovies}
                    loggedIn={loggedIn}
                    isFilteredCards={isFilteredCards}
                    cards={isFilteredCards ? savedFilteredShortTimeCards : savedFilteredCards}
                    savedCards={savedCards}
                    isLoading={isLoading}
                    onMoviesSearch={handleSearchMovies}
                    setFilter={switchFilter}
                    isNotFound={isNotFound}
                    saveMovieToBundle={saveMovieToBundle}
                    deleteMovieFromBundle={deleteMovieFromBundle}
                    onSavedMoviesSearch={searchSavedToBundleMovies}
                    clearingErrors={clearingErrors}
                  />
                  <ProtectedRoute 
                    exact path="/profile"
                    component={Profile}
                    userData={userData}
                    loggedIn={loggedIn}
                    onProfileChange={handleUpdateUser}
                    onLogout={signOut}
                    profileText={profileText}
                    setProfileText={setProfileText}
                  />
                  <Route exact path="/signup">
                    { loggedIn ?
                      <Redirect to="/movies"/> :
                      <Register
                        registerText={registerText}
                        setRegisterText={setRegisterText}
                        onRegister={handleRegister}
                        clearingErrors={clearingErrors}
                      />
                    }
                  </Route>
                  <Route exact path="/signin">
                    { loggedIn ?
                      <Redirect to="/movies"/> :
                      <Login
                        onLogin={handleLogin}
                        loginText={loginText}
                        setLoginText={setLoginText}
                        clearingErrors={clearingErrors}
                      />}  
                  </Route>
                  <Route path="*">
                      <NotFound />
                  </Route>
                </Switch>
          </div>
      </div>
    </CurrentUserContext.Provider>
  )
};

export default App;
