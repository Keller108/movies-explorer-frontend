import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies() {
    return (
        <>
            <Header 
                isMoviesActive={true}
                isMainActive={false}
                isSavedMoviesActive={false}
            />
            <SearchForm />
            <MoviesCardList />
            <Footer />
        </>
    )
};

export default Movies;