import React, { useState } from 'react';
import './SearchForm.css';
import FilterBtn from '../FilterBtn/FilterBtn';

function SearchForm({onMoviesSearch}) {
    
    const [textInput, setTextInput] = useState('');

    function handleInputChange(e) {
        setTextInput(e.target.value);
    }

    function handleSearchForm(e) {
        e.preventDefault();
        onMoviesSearch(textInput);
        console.log(e)
    }
    return (
        <section className="search-form-section">
            <form className="search-form" onSubmit={handleSearchForm}>
                <input 
                    className="search-form__input"
                    placeholder="Фильм"
                    onChange={handleInputChange}
                    type="text"
                    name="text"
                    value={textInput}
                    minLength="1"
                    required
                />
                <button 
                    className="search-form__btn"
                    type="submit"
                >
                    Найти
                </button>
            </form>
            <FilterBtn />
        </section>
    )
};

export default SearchForm;