import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { HiOutlineDocumentDownload } from 'react-icons/hi';
import { FaPowerOff, FaHome } from "react-icons/fa";

function AdminSummary() {
    const navigate = useNavigate();

    // The handler for the logout button click
    const handleLogoutClick = () => {
        alert("Logged out successfully!");
        navigate('/');
    };

    const navigateToAdminPage = () => {
        navigate('/admin');
    }

    const handleshowUserSettings = () => {
        alert('Users Reports and Statements Downloaded.');
    };

    const downloadVendorsRecords = () => {
        alert('Vendors Reports and Statements Downloaded.');
    };

    const handleshowAllGamesSettings = () => {
        alert('Vendors Reports and Statements Downloaded.');
    };

    const handleshowSubAdminSettings = () => {
        alert('Transaction Reports and Statements Downloaded.');
    };

    return (
        <div className="bg-slate-600 flex w-full text-white h-auto">
            <div className="flex flex-col items-center justify-center w-full p-2">
                <div className="text-center font-bold text-2xl md:text-4xl lg:text-6xl my-4">Admin Statements and Reports</div>
                <div className="flex flex-col w-[90%] mx-auto items-center mt-8">
                    <div onClick={handleshowUserSettings} className="text-xl flex items-center mx-auto border-4 md:text-xl lg:text-2xl font-semibold w-auto p-4 m-4 text-white rounded-lg bg-black">
                        <HiOutlineDocumentDownload size={35} className='mr-10' />
                        Users Reports and Statements
                    </div>
                </div>
                <div className="flex flex-col w-[90%]  mx-auto items-center mt-8">
                    <div onClick={handleshowAllGamesSettings} className="text-xl flex items-center mx-auto border-4 md:text-xl lg:text-2xl font-semibold w-auto p-4 m-4 text-white rounded-lg bg-black">
                        <HiOutlineDocumentDownload size={35} className='mr-10' />
                        Games Reports and Statements
                    </div>
                </div>
                <div className="flex flex-col w-[90%]  mx-auto items-center mt-8 text-center">
                    <div onClick={handleshowSubAdminSettings} className="text-xl flex items-center mx-auto border-4 md:text-xl lg:text-2xl font-semibold w-auto p-4 m-4 text-white rounded-lg bg-black">
                        <HiOutlineDocumentDownload size={35} className='mr-10' />
                        Agents Reports and Statements
                    </div>
                </div>
                <div className="flex flex-col w-[90%]  mx-auto items-center mt-8 text-center">
                    <div onClick={handleshowSubAdminSettings} className="text-xl flex items-center mx-auto border-4 md:text-xl lg:text-2xl font-semibold w-auto p-4 m-4 text-white rounded-lg bg-black">
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

export default AdminSummary;



