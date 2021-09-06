import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';

function App() {

  const user = {
    name : `Илон`,
    email : `space-x@gmail.com`,
  }

  return (
      <div className="App">
          <div className="page">
                <Switch>
                  <Route exact path="/">
                      <Main />
                  </Route>
                  <Route exact path="/movies">
                      <Movies />
                  </Route>
                  <Route exact path="/saved-movies">
                      <SavedMovies />
                  </Route>
                  <Route exact path="/profile">
                      <Profile 
                        user={user}
                      />
                  </Route>
                  <Route exact path="/signup">
                      <Register 
                        user={user}
                      />
                  </Route>
                  <Route exact path="/signin">
                      <Login 
                        user={user}
                      />
                  </Route>
                  <Route exact path="*">
                      <NotFound />
                  </Route>
                </Switch>
          </div>
      </div>
  )
};

export default App;
