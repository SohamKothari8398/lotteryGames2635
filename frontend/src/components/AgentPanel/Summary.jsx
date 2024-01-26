import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineDocumentDownload } from 'react-icons/hi';
import { FaPowerOff, FaHome } from "react-icons/fa";

function AgentSummary() {
    const navigate = useNavigate();

    // The handler for the logout button click
    const handleLogoutClick = () => {
        alert("Logged out successfully!");
        navigate('/');
    };

    const navigateToAdminPage = () => {
        navigate('/agent/home');
    }

    const handleshowAllGamesReports = () => {
        alert('My Games Reports and Statements Downloaded.');
    };

    const handleshowUserReports = () => {
        alert('Transaction Reports and Statements Downloaded.');
    };

    return (
        <div className="bg-slate-600 flex w-full text-white h-auto">
            <div className="flex flex-col items-center justify-center w-full p-2">
                <div className="text-center font-bold text-2xl md:text-4xl lg:text-6xl my-4">Agents Statements and Reports</div>
                <div className="flex flex-col w-[90%]  mx-auto items-center mt-8">
                    <div onClick={handleshowAllGamesReports} className="text-xl flex items-center mx-auto border-4 md:text-xl lg:text-2xl font-semibold w-auto p-4 m-4 text-white rounded-lg bg-black">
                        <HiOutlineDocumentDownload size={35} className='mr-10' />
                        My Earnings Reports and Statements
                    </div>
                </div>
                <div className="flex flex-col w-[90%]  mx-auto items-center mt-8">
                    <div onClick={handleshowAllGamesReports} className="text-xl flex items-center mx-auto border-4 md:text-xl lg:text-2xl font-semibold w-auto p-4 m-4 text-white rounded-lg bg-black">
                        <HiOutlineDocumentDownload size={35} className='mr-10' />
                        My Refreals Reports and Statements
                    </div>
                </div>
                <div className="flex flex-col w-[90%]  mx-auto items-center mt-8">
                    <div onClick={handleshowAllGamesReports} className="text-xl flex items-center mx-auto border-4 md:text-xl lg:text-2xl font-semibold w-auto p-4 m-4 text-white rounded-lg bg-black">
                        <HiOutlineDocumentDownload size={35} className='mr-10' />
                        My History
                    </div>
                </div>
                <div className="flex flex-col w-[90%]  mx-auto items-center mt-8 text-center">
                    <div onClick={handleshowUserReports} className="text-xl flex items-center mx-auto border-4 md:text-xl lg:text-2xl font-semibold w-auto p-4 m-4 text-white rounded-lg bg-black">
                        <HiOutlineDocumentDownload size={35} className='mr-10' />
                        Transactions Reports and Statements
                    </div>
                </div>
                <div className="mt-8">
                    <button type="button" onClick={handleLogoutClick} className="bg-red-600 w-auto hover:bg-red-700 hover:border-4 text-white font-bold p-4 m-4 rounded-xl flex items-center">
                        <FaPowerOff className="mr-2" /> Logout
                    </button>
                </div>
            </div>
            <div className="absolute top-1 right-1 bg-black hover:bg-green-600 text-white shadow-md shadow-white m-2 p-2 rounded-lg">
                <button onClick={navigateToAdminPage}>
                    <FaHome size={30} />
                </button>
            </div>
        </div>
    );
};

export default AgentSummary;
