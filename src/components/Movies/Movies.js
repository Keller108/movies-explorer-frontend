import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies({loggedIn, isNotFound, cards, savedMovies, isFilteredCards, onMoviesSearch, onSavedMoviesSearch, isLoading, setFilter, saveMovieToBundle, deleteMovieFromBundle}) {

    function filterChange() {
        setFilter();
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
                cards={cards}
                savedMovies={savedMovies}
                isLoading={isLoading}
                isNotFound={isNotFound}
                saveMovieToBundle={saveMovieToBundle}
                deleteMovieFromBundle={deleteMovieFromBundle}
                isSaved={false}
            />
            <Footer />
        </>
    )
};

export default Movies;