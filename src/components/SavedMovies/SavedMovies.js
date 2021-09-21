import React, { useEffect } from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({loggedIn, isNotFound, cards, savedCards, isFilteredCards, onMoviesSearch, onSavedMoviesSearch, isLoading, setFilter, saveMovieToBundle, deleteMovieFromBundle, clearingErrors}) {

    function filterChange() {
        setFilter();
    }

    useEffect(() => {
        clearingErrors();
    }, []);

    return (
        <>
            <Header 
                isSavedMoviesActive={true}
                isMainActive={false}
                isMoviesActive={false}
                loggedIn={loggedIn}
            />
            <SearchForm
                onMoviesSearch={onMoviesSearch}
                isFilteredCards={isFilteredCards}
                onSavedMoviesSearch={onSavedMoviesSearch}
                onFilterChange={filterChange}
                isSaved={true}
            />
            <MoviesCardList 
                isBtnDisabled={true}
                cards={cards}
                savedCards={savedCards}
                isLoading={isLoading}
                isNotFound={isNotFound}
                saveMovieToBundle={saveMovieToBundle}
                deleteMovieFromBundle={deleteMovieFromBundle}
                isSaved={true}
                clearingErrors={clearingErrors}
            />
            <Footer />
        </>
    )
};

export default SavedMovies;