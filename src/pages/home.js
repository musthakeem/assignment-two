import React from 'react';
import { Layout, ProductCarousel } from 'components';

function Home(props) {
    return (
        <Layout>
            <div className='flex flex-1 pt-16 sm:pt-20'>
                <div className=''>
                    <img className='h-auto w-screen object-contain object-top' src='/main-banner.jpeg' alt='banner'/>
                </div>
            </div>
            <ProductCarousel category='Jewelery' query="jewelery"/>
            <ProductCarousel category='Electronics' query="electronics"/>
            <ProductCarousel category='Mens' query="men's%20clothing"/>
            <ProductCarousel category='Womens' query="women's%20clothing"/>

        </Layout>
    )
}

export default Home;