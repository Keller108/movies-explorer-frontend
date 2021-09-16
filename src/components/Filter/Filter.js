import React from 'react';
import './Filter.css';

function Filter({isFilteredCards}) {
    return (
        <span 
            className={isFilteredCards ? `filter-btn` : `filter-btn filter-btn_hidden`}
        >
            <span 
                className={isFilteredCards ? 
                    `filter-btn__circle` 
                    : `filter-btn__circle filter-btn__circle_hidden`}
            />
        </span>
    )
};

export default Filter;