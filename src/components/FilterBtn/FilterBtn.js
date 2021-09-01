import React from 'react';
import { useState } from 'react';
import './FilterBtn.css';
import Filter from '../Filter/Filter';

function FilterBtn() {
    const [isFilterOff, setIsFilterOff] = useState(false);

    function handleTumblerOff() {
        setIsFilterOff(!isFilterOff)
    };
    return (
        <div className="filter-container">
            <button 
                className="filter"
                onClick={handleTumblerOff}
            >
            <Filter 
                isOff={isFilterOff}
            />
            </button> 
            <p className="filter__text">
                Короткометражки
            </p>
        </div>
    )
};

export default FilterBtn;