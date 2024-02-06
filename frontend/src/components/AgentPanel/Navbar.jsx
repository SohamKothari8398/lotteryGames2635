import React, { useState } from 'react';
import { TiThMenu } from 'react-icons/ti';
import { TbSettingsShare } from 'react-icons/tb';
import { BsDatabaseAdd } from 'react-icons/bs';
import { FaRegCircleUser } from "react-icons/fa6";
import { LuGamepad2, LuWallet, LuUserCircle } from "react-icons/lu";
import { PiFilesBold } from 'react-icons/pi';
import { FaWindowClose, FaUserSecret, FaPowerOff, FaRegAddressBook } from 'react-icons/fa';
import { FaMobileRetro } from 'react-icons/fa6';
import { MdQrCode2, MdOutlineReportProblem, MdOutlineLocalOffer } from 'react-icons/md';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/up365Logo.webp';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import GetWalletBalance from '../UsersPanel/WalletBalance';

function AgentsNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    const navigate = useNavigate();
    // const navigateToCreateGiftCardPage = () => {
    //     navigate('/agent/createGiftCard');
    // }
    const navigateToAgentSettingsPage = () => {
        navigate('/agent/settings');
    }
    const navigateToAgentUserRecords = () => {
        navigate('/agent/userRecords');
    }
    const navigateToAddUserCredentials = () => {
        navigate('/agent/addUserCredentials');
    }
    const navigateToAllRecords = () => {
        navigate('/agent/allRecords');
    }
    const navigateToAgentSummaryPage = () => {
        navigate('/agent/summary');
    }
    const navigateToUserDepositPage = () => {
        navigate('/deposit');
    };
    const navigateToUserWallet = () => {
        navigate('/user/wallet');
    };
    const navigateToUserAddComplaintsPage = () => {
        navigate('/user/complaints');
    };
    const navigateToUserOffers = () => {
        navigate('/user/offers');
    };

    const navigateToUserWithdrawPage = () => {
        navigate('/withdraw');
    };
    const navigateToGames = () => {
        navigate('/games');
    };
    const handleLogout = () => {
        logout();
    };


    const renderMenu = () => {
        if (!isMenuOpen) {
            return null;
        }
        return (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50">
                <div className="flex bg-slate-800 absolute w-[50%] h-auto m-auto rounded-lg top-0 bottom-0 right-0 left-50 justify-center items-center">
                    <ul className="flex flex-col text-sm md:text-base">
                        <li className="flex border-2 p-2 m-2 rounded-lg">
                            <div className='w-full mr-1 md:mr-4'>
                                <FaUserSecret size={30} />
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
                        <li>
                            <button onClick={handleLogout} className="w-auto ml-2 mt-2 border-transparent text-sm underline underline-offset-2 hover:border-red-600 flex text-red-600 font-bold flex-row p-2 rounded-lg transition duration-300 ease-in-out">
                                <FaPowerOff size={25} style={{ color: 'red' }} /> <span className="p-1"> </span> Logout
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
                    <div>
                        <img src={logo} alt="logo not available" className='h-16 md:h-20 w-[10rem] mr-4 rounded-xl' />
                    </div>
                    <div className='hover:text-yellow-600 flex italic font-bold mr-10'>
                        <div className='text-3xl md:text-5xl lg:text-6xl'>UP</div>
                        <div className='flex flex-col mt-2 ml-2 text-xs md:text-sm lg:text-lg'>
                            <div>
                                365
                            </div>
                            <div className='-ml-4 lg:-ml-6'>
                                Gaming
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="hidden font-bold md:flex lg:flex xl:flex  space-x-4">
                    <ul className="ml-4 font-semibold text-xs md:text-xl lg:text-xl flex space-x-4">
                        <li className="flex border-b-4 pb-2">
                            <div className='w-full mr-4'>
                                Agent-ID:
                            </div>
                            <div className='w-full flex text-center text-lg'>
                                {user.userID}
                            </div>
                        </li>
                        <li className="flex border-b-4 pb-2">
                            <div className='w-full mr-4'>
                                <FaMobileRetro size={30} /></div>
                            <div className='w-full text-center text-lg'>
                                {user.mobileNumber}</div>
                        </li>
                        <li className="flex border-b-4 pb-2">
                            <div className='w-full mr-4'>
                                <MdQrCode2 size={30} /></div>
                            <div className='w-full text-center text-lg'>
                                {user.promoCode}</div>
                        </li>
                        <li>
                            <div className=" flex flex-col text-white items-center">
                                <button className=" w-auto mt-2 hover:bg-white hover:text-slate-900 p-2 ml-4 font-semibold text-sm lg:text-xl rounded-lg flex flex-row   focus:outline-none  transition duration-300 ease-in-out">
                                    <BiSolidMessageSquareEdit size={25} /> <span className='p-1'></span> Notifications
                                </button>
                            </div>
                        </li>
                    </ul>
                </div> */}

                <div className="flex">
                    <button onClick={handleMenuClick} className="w-10 h-10 rounded-full mr-10">
                        <LuUserCircle size={35} />
                    </button>
                </div>
            </div>
            <div className="flex font-bold justify-evenly mt-8 space-x-4 overflow-x-auto lg:overflow-hidden">
                <div className="w-full h-full text-sm md:text-base grid grid-cols-10 gap-20 md:gap-10">
                    <div onClick={navigateToUserWallet} className="flex flex-col mt-2 ml-4 items-center border-b-4 border-transparent hover:border-white cursor-pointer w-10 h-30 md:w-24 lg:w-30 ">
                        <LuWallet size={35} />
                        <span><GetWalletBalance /></span>
                    </div>
                    <div onClick={navigateToUserDepositPage} className="flex flex-col mt-2 ml-4 items-center border-b-4 border-transparent hover:border-white cursor-pointer w-10 h-30 md:w-24 lg:w-30 ">
                        <BsDatabaseAdd size={35} />
                        <span>Deposit</span>
                    </div>
                    <div onClick={navigateToUserWithdrawPage} className="flex flex-col mt-2 ml-4 items-center border-b-4 border-transparent hover:border-white cursor-pointer w-10 h-30 md:w-24 lg:w-30 ">
                        <BiMoneyWithdraw size={35} />
                        <span>Withdraw</span>
                    </div>
                    <div onClick={navigateToUserAddComplaintsPage} className="flex flex-col mt-2 ml-4 items-center border-b-4 border-transparent hover:border-white cursor-pointer w-10 h-30 md:w-24 lg:w-30 ">
                        <MdOutlineReportProblem size={35} />
                        <span>Complaint</span>
                    </div>
                    <div onClick={navigateToGames} className="flex flex-col mt-2 ml-4 items-center border-b-4 border-transparent hover:border-white cursor-pointer w-10 h-30 md:w-24 lg:w-30 ">
                        <LuGamepad2 size={35} />
                        <span>Games</span>
                    </div>
                    <div onClick={navigateToUserOffers} className="flex flex-col mt-2 ml-4 items-center border-b-4 border-transparent hover:border-white cursor-pointer w-10 h-30 md:w-24 lg:w-30 ">
                        <MdOutlineLocalOffer size={35} />
                        <span>Offers</span>
                    </div>
                    <div onClick={navigateToAgentUserRecords} className="flex flex-col mt-2 ml-4 items-center text-center border-b-4 border-transparent hover:border-white cursor-pointer w-10 h-30 md:w-24 lg:w-30 ">
                        <FaRegAddressBook size={35} />
                        <span>User Records</span>
                    </div>
                    <div onClick={navigateToAddUserCredentials} className="flex flex-col mt-2 ml-4 items-center text-center border-b-4 border-transparent hover:border-white cursor-pointer w-10 h-30 md:w-24 lg:w-30 ">
                        <FaRegCircleUser size={35} />
                        <span>User Settings</span>
                    </div>
                    <div onClick={navigateToAgentSettingsPage} className="flex flex-col mt-2 ml-4 items-center border-b-4 border-transparent hover:border-white cursor-pointer w-10 h-30 md:w-24 lg:w-30 ">
                        <TbSettingsShare size={35} />
                        <span>Settings</span>
                    </div>
                    <div onClick={navigateToAgentSummaryPage} className="flex flex-col mt-2 ml-4 items-center border-b-4 border-transparent hover:border-white cursor-pointer w-10 h-30 md:w-24 lg:w-30 ">
                        <PiFilesBold size={35} />
                        <span>Summary</span>
                    </div>
                </div>
            </div>
            <div className="flex md:hidden lg:hidden">
                <button onClick={handleMenuClick} className="w-10 h-10 rounded-full">
                    <TiThMenu size={30} />
                </button>
            </div>
            {renderMenu()}
        </nav >
    );
}

export default AgentsNavbar;