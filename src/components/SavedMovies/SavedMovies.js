import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({loggedIn, isNotFound, cards, savedMovies, isFilteredCards, onMoviesSearch, onSavedMoviesSearch, isLoading, setFilter, saveMovieToBundle, deleteMovieFromBundle}) {

    function filterChange() {
        setFilter();
    }

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
                savedMovies={savedMovies}
                isLoading={isLoading}
                isNotFound={isNotFound}
                saveMovieToBundle={saveMovieToBundle}
                deleteMovieFromBundle={deleteMovieFromBundle}
                isSaved={true}
            />
            <Footer />
        </>
    )
};

export default SavedMovies;