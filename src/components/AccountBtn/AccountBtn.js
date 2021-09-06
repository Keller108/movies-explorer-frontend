import React from 'react';
import './AccountBtn.css';
import { Link } from 'react-router-dom';

function AccountBtn() {
    return (
        <ul className="account">
            <Link className="account__text transparent-link" to="/profile">Аккаунт</Link>
            <Link className="account__btn transparent-link" to="/profile"></Link>
        </ul>
    )
}; 

export default AccountBtn;