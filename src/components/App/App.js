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
import * as mainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';

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

  const pathname = useLocation();
  const history = useHistory(); 
 
  // КЛИЕНТСКАЯ ЧАСТЬ //

  useEffect(() => {
    tokenCheck()
  }, []);

  useEffect(() => {
    if (loggedIn) { 
      mainApi.getInfo()
        .then((data) => {
            setCurrentUser(data)
            history.push('/');
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
      mainApi.getContent(jwt)
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
      });
      mainApi.getSavedMovies()
        .then((movies) => {
          setSavedCards(movies);
          setSavedFilteredCards(movies);
          localStorage.setItem('savedMovies', JSON.stringify(movies));
        })
        .catch(err => console.log(err));
    };  
  };

  function handleRegister ({name, email, password}) {
    return mainApi.register(name, email, password)
    .then((res) => {
        if (res) {
            history.push('/signin')
        } else {
            Promise.reject(`Ошибка ${res.status}`)
        }
    })
    .catch(err => console.log(err));
  };

  function handleLogin ({email, password}) {
    return mainApi.authorize(email, password)
      .then((res) => {
        if (res.token) {
            localStorage.setItem('jwt', res.token);
            setLoggedIn(true);
            tokenCheck();
      }            
    })
    .catch(err => console.log(err));
  };

  function handleUpdateUser(userData) {
    mainApi.updateInfo(userData)
    .then((data) => {
        setCurrentUser(data)
        history.push('/')
    })
    .catch(err => console.log(err));
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
      moviesApi.getMovies()
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
      .catch(err => console.log(err));
    }
    
    setTimeout(() => {
      setIsLoading(false);
    }, 900);
  }

  // СОХРАНЕНИЕ ФИЛЬМОВ //

  function saveMovieToBundle(movie) {
    console.log(movie)
    setIsLoading(true);
      mainApi.saveMovie({movie})
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
      .catch(err => console.log(err));

    setTimeout(() => {
      setIsLoading(false);
    }, 900);
  };

  // ПОИСК СОХРАНЕННЫХ ФИЛЬМОВ //

  function searchSavedToBundleMovies(value) {
    if (savedCards.length > 0) {
      setSavedFilteredCards(goSearch(savedCards, value));
    } else {
      setIsLoading(true);
      mainApi.getSavedMovies()
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

  // ФИЛЬТРАЦИЯ ФИЛЬМОВ // 

  function filterMoviesById(moviesList, id) {
    return moviesList.filter((movie) => { return movie._id !== id});
  };

  // УДАЛЕНИЕ ФИЛЬМОВ //

  function deleteMovieFromBundle(id) {
    setIsLoading(true);
    mainApi.deleteMovie({id})
      .then(() => {
        const result = filterMoviesById(savedCards, id);
        setSavedCards(result);
        localStorage.setItem('savedMovies', JSON.stringify(result));
        setSavedFilteredShortTimeCards(filterMoviesById(savedFilteredShortTimeCards, id));
        setSavedFilteredCards(filterMoviesById(savedFilteredCards, id));
      })
      .catch(err => console.log(err));

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
                    savedMovies={savedCards}
                    isLoading={isLoading}
                    onMoviesSearch={handleSearchMovies}
                    setFilter={switchFilter}
                    isNotFound={isNotFound}
                    saveMovieToBundle={saveMovieToBundle}
                    deleteMovieFromBundle={deleteMovieFromBundle}
                    onSavedMoviesSearch={searchSavedToBundleMovies}
                  />
                  <ProtectedRoute 
                    exact path="/saved-movies"
                    component={SavedMovies}
                    loggedIn={loggedIn}
                    isFilteredCards={isFilteredCards}
                    cards={isFilteredCards ? savedFilteredShortTimeCards : savedFilteredCards}
                    savedMovies={savedCards}
                    isLoading={isLoading}
                    onMoviesSearch={handleSearchMovies}
                    setFilter={switchFilter}
                    isNotFound={isNotFound}
                    saveMovieToBundle={saveMovieToBundle}
                    deleteMovieFromBundle={deleteMovieFromBundle}
                    onSavedMoviesSearch={searchSavedToBundleMovies}
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
