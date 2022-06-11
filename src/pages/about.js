import { Layout } from 'components';
import React from 'react';

function About(props) {
    return (
        <Layout>
            <div className='flex flex-col flex-grow pt-16 sm:pt-20'>
                This is ecommerce demo done as part of assignemnt for the full stack developer.
            </div>
        </Layout>
    );
}

export default About;