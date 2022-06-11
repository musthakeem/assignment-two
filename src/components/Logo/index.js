import React from 'react';
import { Link } from 'react-router-dom';

function Logo(props) {
    return (
        <Link to='/'>
        <div className="h-12 w-12 pr-6 border-r-2 align-middle flex items-center" >
        <img className="h-auto w-6" src="//res.cdn.office.net/owamail/20220527002.09/resources/images/favicons/mail-seen.ico" alt=""/>
        </div>
        </Link>
    );
}

export default Logo;