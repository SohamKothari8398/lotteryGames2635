import React from 'react';
import Navbar from './NavBar';
import GamesCards from '../Games/GamesCards';
import UserStickyFooter from './StickyFooter';

function User() {
    return (
        <div className='bg-slate-500'>
            <Navbar />
            <GamesCards />
            <UserStickyFooter />
        </div >
    )
}
export default User;