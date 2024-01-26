import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import ResultGamesColorComponent from '../LandingPage/ResultPageGamesColorChange';
import SubAdminUserRecords from './UserRecords';

function AgentsAllRecords() {
    const navigate = useNavigate();

    // Use States
    const [showAllGamesRecords, setshowAllGamesRecords] = useState('');


    const navigateToHomePage = () => {
        navigate('/agent/home');
    };

    const handleshowUserRecords = () => {
        navigate('/agent/userRecords');
    };

    const handleshowAllGamesRecords = () => {
        setshowAllGamesRecords(!showAllGamesRecords);
    };

    return (
        <div className="bg-slate-600 flex w-full h-auto">
            <div className="flex flex-col items-center justify-center w-full p-2">
                <div className="text-center font-bold text-white text-2xl md:text-4xl lg:text-6xl my-4">All Sub-Admin Records</div>
                <div onClick={handleshowUserRecords} className="text-center font-semibold text-white bg-black border-4 rounded-lg text-md md:text-xl lg:text-2xl p-4 my-4 flex flex-row">Users Records <MdOutlineArrowDropDownCircle size={35} className='ml-4' /></div>
                <div onClick={handleshowAllGamesRecords} className="text-center font-semibold h-auto text-white bg-black border-4 rounded-lg text-md md:text-xl lg:text-2xl p-4 my-4 flex flex-row">All Games Records <MdOutlineArrowDropDownCircle size={35} className='ml-4' /></div>
                {showAllGamesRecords ? (<div className='w-full h-auto'>
                    <ResultGamesColorComponent />
                </div>) : (<></>)}
            </div>
            <div className="absolute top-1 right-1 bg-black hover:bg-green-600 text-white shadow-md shadow-white m-2 p-2 rounded-lg">
                <button onClick={navigateToHomePage}>
                    <FaHome size={30} />
                </button>
            </div>
        </div>
    );
}

export default AgentsAllRecords;
