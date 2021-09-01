import React from 'react';
import { useState } from 'react';
import './LikeBtn.css';

function LikeBtn (onLikeChange, isBtnLiked) {

    const [isLiked, setIsLiked] = useState(false);

    function handleLike () {
        setIsLiked(!isLiked)
    };

    return (
        <button 
            onClick={handleLike}
            className={isLiked ? `movies-card-item__like-btn movies-card-item__like-btn_visible` : `movies-card-item__like-btn`}
            type="button"
            aria-label="Like"
        />
    )
};

export default LikeBtn;