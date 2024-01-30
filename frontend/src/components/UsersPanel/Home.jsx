import React from 'react';
import Navbar from './NavBar';
import GamesCards from '../Games/GamesCards';
import UserStickyFooter from './StickyFooter';

function User() {
    return (
        <div className=''>
            <Navbar />
            <GamesCards />
            {/* <UserStickyFooter /> */}
        </div >
    )
}
export default User;