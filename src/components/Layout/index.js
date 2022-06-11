import Footer from 'components/Footer';
import Navigation from 'components/Navigation';
import React, { Fragment } from 'react';

function Layout({children}) {
    return (
        <Fragment>
            <Navigation/>
            {children}
            <Footer/>
        </Fragment>
    );
}

export default Layout;