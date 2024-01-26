import React from 'react'
import AdminNavbar from './Navbar';
import AdminControlBar from './ControlBar';
import GamesCards from '../Games/GamesCards';

function AgentsHome() {
    return (
        <div className='bg-slate-900 text-white font-bold'>
            <AdminNavbar />
            <AdminControlBar />
            <GamesCards />
        </div>
    );
};

export default AgentsHome;    