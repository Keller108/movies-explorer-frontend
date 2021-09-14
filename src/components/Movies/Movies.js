import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({loggedIn}) {
    return (
        <>
            <Header 
                isMainActive={true}
                isSavedMoviesActive={false}
                isMoviesActive={false}
                loggedIn={loggedIn}
            />
            <SearchForm />
            <MoviesCardList />
            <Footer />
        </>
    )
};

export default Movies;