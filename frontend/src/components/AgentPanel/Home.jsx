import React from 'react'
import AgentNavbar from './Navbar';
import GamesCards from '../Games/GamesCards';
import { BsWhatsapp } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

function AgentsHome() {
    const navigate = useNavigate();
    const handleHelpClick = () => { navigate('/helpCenter'); };
    return (
        <div className='font-bold'>
            <AgentNavbar />
            <GamesCards />
            <div className='w-full bg-white h-full'>
                <button onClick={handleHelpClick} className="fixed  flex flex-row z-50 w-auto h-auto bottom-8 md:left-4 bg-green-600 hover:bg-white hover:text-black p-2 outline outline-4 outline-white ml-4 font-bold text-xl rounded-full">
                    <BsWhatsapp size={35} />
                </button>
            </div>
        </div>
    );
};

export default AgentsHome;    