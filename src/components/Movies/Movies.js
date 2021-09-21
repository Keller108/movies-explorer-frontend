import React, { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({loggedIn, isNotFound, cards, savedCards, isFilteredCards, onMoviesSearch, onSavedMoviesSearch, isLoading, setFilter, saveMovieToBundle, deleteMovieFromBundle, clearingErrors, isServerError }) {

    function filterChange() {
        setFilter();
    }

    useEffect(() => {
        clearingErrors();
    }, []);

    const [moviesDisplay, setMoviesDisplay] = useState(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth > 1180) {
            return 16
        } else if (windowWidth >= 916) {
            return 12
        } else if (windowWidth >= 680) {
            return 8
        } else return 5
    });

    const [amountMovies, setAmountMovies] = useState(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth > 1180) {
            return 4
        } else if (windowWidth >= 916) {
            return 3
        } else if (windowWidth >= 680) {
            return 2
        } else return 2
    });

    function onScreenWidthChange() {
        const windowWidth = window.innerWidth;
        if (windowWidth > 1180) {
            setMoviesDisplay(16);
            setAmountMovies(4)
        } else if (windowWidth >= 916) {
            setMoviesDisplay(12);
            setAmountMovies(3)
        } else if (windowWidth >= 680) {
            setMoviesDisplay(8);
            setAmountMovies(2)
        } else {
            setMoviesDisplay(5);
            setAmountMovies(2)
        }
    };

    useEffect(() => {
        window.addEventListener('resize', onScreenWidthChange)
    });

    const cardsVisible = cards.slice(0, moviesDisplay);
    function addCardsToVisibleList() {
        setMoviesDisplay(prevState => prevState + amountMovies);
    }

    return (
        <>
            <Header 
                isMainActive={true}
                isSavedMoviesActive={false}
                isMoviesActive={false}
                loggedIn={loggedIn}
            />
            <SearchForm
                onMoviesSearch={onMoviesSearch}
                onSavedMoviesSearch={onSavedMoviesSearch}
                isFilteredCards={isFilteredCards}
                onFilterChange={filterChange}
                isSaved={false}
            />
            <MoviesCardList 
                cards={cardsVisible}
                savedCards={savedCards}
                isLoading={isLoading}
                isNotFound={isNotFound}
                saveMovieToBundle={saveMovieToBundle}
                deleteMovieFromBundle={deleteMovieFromBundle}
                isSaved={false}
                onAddMovies={addCardsToVisibleList}
                isServerError={isServerError}
            />
            <Footer />
        </>
    )
};

export default Movies;