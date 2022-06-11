import Logo from 'components/Logo';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Cart from './Cart';

function Navigation(props) {
    return (
        <nav className="flex fixed mt-0 mx-0 w-screen z-50 flex-wrap items-center justify-between bg-slate-100 px-2 drop-shadow">
            <div className="w-screen flex items-center justify-between px-3 py-2 sm:py-4 sm:mx-4 lg:mx-6">
                <Logo/>
                <ul className='ml-4 flex flex-row items-center pl-0 mb-0 list-none'>
                    <li className="ml=4">
                        <NavLink 
                        className={({isActive})=> isActive ? 'font-bold' : undefined} 
                        to="/">Home</NavLink>
                    </li>
                    <li className="ml-4">
                        <NavLink 
                        className={({isActive})=> isActive ? 'font-bold' : undefined} 
                        to="/about">About</NavLink>
                    </li>
                </ul>          
                <div className='ml-auto'>
                    <Link to='/cart'>
                        <Cart/>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;