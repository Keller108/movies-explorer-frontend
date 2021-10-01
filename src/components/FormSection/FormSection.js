import React from 'react';
import './FormSection.css';
import {Link} from 'react-router-dom';
import Logo from '../Logo/Logo';

function FormSection({titleText, children, linkPath, linkText, linkTitle, onClearingErrors}) {
    return (
        <section className="form-section">
            <Logo />
            <h1 className="form__title">
                {titleText}
            </h1>
            {children}
            <Link onClick={onClearingErrors} className="form__link transparent-link" to={linkPath}>{linkText}<span className="form__link_clr_blue">{linkTitle}</span></Link>
        </section>
    )
};

export default FormSection;