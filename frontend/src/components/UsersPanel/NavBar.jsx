import React, { useState } from 'react';
import { TbSettingsShare } from 'react-icons/tb';
import { LuWallet, LuGamepad2, LuUserCircle } from 'react-icons/lu';
import { FaWindowClose, FaPowerOff, FaUserCircle } from 'react-icons/fa';
import { FaMobileRetro } from 'react-icons/fa6';
import { MdQrCode2, MdOutlineReportProblem, MdOutlineLocalOffer } from "react-icons/md";
import logo from '../../assets/up365LogoDark.webp';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { BsDatabaseAdd } from 'react-icons/bs';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { PiFilesBold } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import GetWalletBalance from '../UsersPanel/WalletBalance';

function UserNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    const handleLogout = () => {
        logout();
    };
    const navigate = useNavigate();

    const navigateToUserDepositPage = () => {
        navigate('/deposit');
    };

    const navigateToUserWithdrawPage = () => {
        navigate('/withdraw');
    };

    const navigateToUserAddComplaintsPage = () => {
        navigate('/user/complaints');
    };

    const navigateToUserSummaryPage = () => {
        navigate('/user/summary');
    };
    const navigateToProfile = () => {
        navigate('/user/profile');
    };
    const navigateToGames = () => {
        navigate('/games');
    };
    const navigateToUserWallet = () => {
        navigate('/user/wallet');
    };
    // const navigateToHelpCenter = () => {
    //     navigate('/helpCenter');
    // };
    // const navigateToUserResult = () => {
    //     navigate('/user/result');
    // };
    const navigateToUserOffers = () => {
        navigate('/user/offers');
    };
    const renderMenu = () => {
        if (!isMenuOpen) {
            return null;
        }
        return (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50">
                <div className="flex bg-slate-800 absolute w-[80%] h-auto m-auto rounded-lg top-0 bottom-0 right-0 left-50 justify-center items-center">
                    <ul className="flex flex-col text-sm md:text-base">
                        <li className="flex border-2 p-2 m-2 rounded-lg">
                            <div className='w-full mr-1 md:mr-4'>
                                <FaUserCircle size={30} />
                            </div>
                            <div className='w-full text-center text-lg'>
                                {user.userID}</div>
                        </li>
                        <li className="flex border-2 p-2 m-2 rounded-lg">
                            <div className='w-full mr-1 md:mr-4'>
                                <FaMobileRetro size={30} /></div>
                            <div className='w-full text-center text-lg'>
                                {user.mobileNumber}</div>
                        </li>
                        <li className="flex border-2 p-2 m-2 rounded-lg">
                            <div className='w-full mr-1 md:mr-4'>
                                <MdQrCode2 size={30} /></div>
                            <div className='w-full text-center text-lg'>
                                {user.promoCode}</div>
                        </li>
                        <li className="flex p-2 m-2">
                            <button type="button" onClick={handleLogout} className="bg-red-600 w-auto hover:bg-red-700 hover:border-4 text-white font-bold py-2 px-8 m-2 rounded-xl flex">
                                <FaPowerOff className="mr-2" size={22} /> Logout
                            </button>
                        </li>
                    </ul>
                    <button onClick={handleMenuClick} className="absolute top-4 right-4 z-50">
                        <FaWindowClose size={30} style={{ color: 'red' }} />
                    </button>
                </div>
            </div>
        );
    };

    return (
        <nav className=" bg-black text-white grid grid-cols-1 p-4 sticky top-0 z-20">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-xl flex text-white items-center">
                    <div className='py-4'>
                        <img src={logo} alt="logo not available" className='h-[4rem] w-[10rem] md:h-[6rem] cursor-pointer md:w-[14rem] mr-4 rounded-xl' />
                    </div>
                </div>

                {/* <div className="hidden font-bold md:flex lg:flex xl:flex space-x-4">
                    <ul className="ml-4 font-semibold md:text-xl lg:text-xl flex space-x-4">
                        <li className="flex border-2 p-2 m-2 rounded-lg">
                            <div className='w-full mr-1 md:mr-4'>
                                <FaUserCircle size={30} />
                            </div>
                            <div className='w-full text-center text-lg'>
                                {user.userID}</div>
                        </li>
                        <li className="flex border-2 p-2 m-2 rounded-lg">
                            <div className='w-full mr-1 md:mr-4'>
                                <FaMobileRetro size={30} /></div>
                            <div className='w-full text-center text-lg'>
                                {user.mobileNumber}</div>
                        </li>
                        <li className="flex border-2 p-2 m-2 rounded-lg">
                            <div className='w-full mr-1 md:mr-4'>
                                <MdQrCode2 size={30} /></div>
                            <div className='w-full text-center text-lg'>
                                {user.promoCode}</div>
                        </li>
                    </ul>
                </div>

                <div className='hidden font-bold md:flex lg:flex xl:flex'>
                    <ul className="flex flex-row">
                        <li>
                            <button onClick={handleLogout} className="w-auto ml-2 mt-2 border-transparent text-sm underline underline-offset-2 hover:border-red-600 flex text-red-600 font-bold flex-row p-2 rounded-lg transition duration-300 ease-in-out">
                                <FaPowerOff size={25} style={{ color: 'red' }} /> <span className="p-1"> </span> Logout
                            </button>
                        </li>
                    </ul>
                </div> */}
                <div className="flex">
                    <button onClick={handleMenuClick} className="w-10 outline-none h-10 rounded-full lg:mr-16">
                        <LuUserCircle size={35} />
                    </button>
                </div>
                {renderMenu()}
            </div>
            <div className="flex font-bold justify-evenly mt-8 space-x-4 overflow-x-auto lg:overflow-hidden">
                <div className="w-full h-full text-sm md:text-base grid grid-cols-8 gap-20 md:gap-10">
                    <div onClick={navigateToUserWallet} className="flex flex-col mt-2 ml-4 items-center border-b-4 border-transparent hover:border-white w-10 h-30 md:w-24 lg:w-30 ">
                        <LuWallet size={35} />
                        <span><GetWalletBalance /></span>
                    </div>
                    <div onClick={navigateToUserDepositPage} className="flex flex-col mt-2 ml-4 items-center border-b-4 border-transparent hover:border-white w-10 h-30 md:w-24 lg:w-30 ">
                        <BsDatabaseAdd size={35} />
                        <span>Deposit</span>
                    </div>
                    <div onClick={navigateToUserWithdrawPage} className="flex flex-col mt-2 ml-4 items-center border-b-4 border-transparent hover:border-white w-10 h-30 md:w-24 lg:w-30 ">
                        <BiMoneyWithdraw size={35} />
                        <span>Withdraw</span>
                    </div>
                    <div onClick={navigateToUserAddComplaintsPage} className="flex flex-col mt-2 ml-4 items-center border-b-4 border-transparent hover:border-white w-10 h-30 md:w-24 lg:w-30 ">
                        <MdOutlineReportProblem size={35} />
                        <span>Complaint</span>
                    </div>

                    <div onClick={navigateToGames} className="flex flex-col mt-2 ml-4 items-center border-b-4 border-transparent hover:border-white w-10 h-30 md:w-24 lg:w-30 ">
                        <LuGamepad2 size={35} />
                        <span>Games</span>
                    </div>

                    {/* <div onClick={navigateToUserResult} className="flex flex-col mt-2 ml-4 items-center border-b-4 border-transparent hover:border-white w-10 h-30 md:w-24 lg:w-30 ">
                        <TbFileAnalytics size={35} />
                        <span>History</span>
                    </div> */}
                    <div onClick={navigateToUserOffers} className="flex flex-col mt-2 ml-4 items-center border-b-4 border-transparent hover:border-white w-10 h-30 md:w-24 lg:w-30 ">
                        <MdOutlineLocalOffer size={35} />
                        <span>Offers</span>
                    </div>
                    <div onClick={navigateToProfile} className="flex flex-col mt-2 ml-4 items-center border-b-4 border-transparent hover:border-white w-10 h-30 md:w-24 lg:w-30 ">
                        <TbSettingsShare size={35} />
                        <span>Settings</span>
                    </div>
                    <div onClick={navigateToUserSummaryPage} className="flex flex-col mt-2 ml-4 items-center border-b-4 border-transparent hover:border-white w-10 h-30 md:w-24 lg:w-30 ">
                        <PiFilesBold size={35} />
                        <span>Summary</span>
                    </div>
                </div>
            </div>
        </nav >
    );
};
export default UserNavbar;

