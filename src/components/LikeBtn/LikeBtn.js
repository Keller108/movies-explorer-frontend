import React from 'react';
import './LikeBtn.css';

function LikeBtn ({isLike, isSaved, handleLikeMovie, handleDeleteMovie}) {

    return (
        <button 
            onClick={isSaved ? handleDeleteMovie : handleLikeMovie}
            className={isLike ? `movies-card-item__like-btn movies-card-item__like-btn_visible` : `movies-card-item__like-btn`}
            type="button"
            aria-label="Like"
        />
    )
};

export default LikeBtn;