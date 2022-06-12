import Footer from 'components/Footer';
import React from 'react';

function Layout({children}) {
    return (
        <div className='flex flex-col h-screen justify-between'>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    );
}

export default Layout;