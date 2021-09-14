import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({loggedIn}) {
    return (
        <>
            <Header 
                isSavedMoviesActive={true}
                isMainActive={false}
                isMoviesActive={false}
                loggedIn={loggedIn}
            />
            <SearchForm />
            <MoviesCardList />
            <Footer />
        </>
    )
};

export default SavedMovies;