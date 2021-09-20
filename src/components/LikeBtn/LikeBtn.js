import React from 'react';
import './LikeBtn.css';

function LikeBtn ({isLike, onClick}) {

    return (
        <button 
            onClick={onClick}
            className={isLike ? `movies-card-item__like-btn movies-card-item__like-btn_visible` : `movies-card-item__like-btn`}
            type="button"
            aria-label="Like"
        />
    )
};

export default LikeBtn;