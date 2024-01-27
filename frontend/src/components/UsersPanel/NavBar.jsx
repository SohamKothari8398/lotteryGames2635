import React, { useState } from 'react';
import { TiThMenu } from 'react-icons/ti';
import { FaWindowClose, FaWallet, FaPowerOff, FaUserCircle } from 'react-icons/fa';
import { FaMobileRetro } from 'react-icons/fa6';
import { MdQrCode2, MdOutlineReportProblem } from "react-icons/md";
import logo from '../../assets/up365Logo.jpeg';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { BsDatabaseFillAdd } from 'react-icons/bs';
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
    const renderMenu = () => {
        if (!isMenuOpen) {
            return null;
        }
        return (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 justify-center items-center">
                <div className="bg-slate-500 absolute w-[65vw] h-[65vh] m-auto rounded-lg top-0 bottom-0 right-0 left-0 flex justify-center items-center">
                    <ul className="flex flex-col">
                        <li className="flex border-b-4 pb-2">
                            <div className='w-full mr-4'>
                                <FaUserCircle size={30} />
                            </div>
                            <div className='w-full text-center text-lg'>
                                {user.userID}</div>
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
        <nav className="bg-slate-900 text-white grid grid-cols-1 p-4 sticky top-0 z-20">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-xl flex text-white items-center">
                    <div>
                        <img src={logo} alt="logo not available" className='h-16 md:h-20 w-44 mr-4 rounded-xl' />
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
                    {/* <div className='hover:text-yellow-800 border-none italic text-2xl md:text-4xl lg:text-6xl font-bold mr-10'>UP365</div> */}
                </div>

                <div className="hidden font-bold md:flex lg:flex xl:flex  space-x-4">
                    <ul className="ml-4 font-semibold md:text-xl lg:text-xl flex space-x-4">
                        <li className="flex border-b-4 pb-2">
                            <div className='w-full mr-4'>
                                <FaUserCircle size={30} />
                            </div>
                            <div className='w-full text-center text-lg'>
                                {user.userID}</div>
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
                </div>
                <div className="flex md:hidden lg:hidden">
                    <button onClick={handleMenuClick} className="w-10 h-10 rounded-full">
                        <TiThMenu size={30} />
                    </button>
                </div>
                {renderMenu()}
            </div>
            <div className="container bg-slate-900 text-white p-4 md:top-[6vh] lg:top-[11vh] xl:top-[2vh] top-[11vh] z-10 mx-auto rounded-lg grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 justify-between items-center text-2xl sm:text-xl md:text-xl">
                <div className="flex flex-col text-white items-center m-auto hover:bg-slate-900 text-white-600 font-bold p-2 text-sm lg:text-xl rounded-lg  focus:outline-none  transition duration-300 ease-in-out">
                    <span className='p-2 flex flex-row border-b-4'>
                        <FaWallet size={25} />
                        <GetWalletBalance />
                    </span>
                </div>
                <div className=" flex flex-col text-white items-center">
                    <button onClick={navigateToUserDepositPage} className=" w-auto mt-2 hover:bg-white text-sm lg:text-xl hover:text-slate-900 p-2  outline outline-2 outline-white ml-4 font-semibold rounded-lg flex flex-row   focus:outline-none  transition duration-300 ease-in-out">
                        <BsDatabaseFillAdd size={25} /> <span className='p-2'> </span> Deposit
                    </button>
                </div>
                <div className="flex flex-col text-white items-center">
                    <button onClick={navigateToUserWithdrawPage} className="  w-auto mt-2 hover:bg-white text-sm lg:text-xl hover:text-slate-900 p-2 flex flex-row outline outline-2 outline-white ml-4 font-semibold  rounded-lg  focus:outline-none  transition duration-300 ease-in-out">
                        <BiMoneyWithdraw size={25} /> <span className='p-2'> </span>  Withdraw
                    </button>
                </div>
                <div className="flex flex-col text-white items-center">
                    <button onClick={navigateToUserAddComplaintsPage} className="  w-auto mt-2 hover:bg-white text-sm lg:text-xl hover:text-slate-900 p-2 flex flex-row outline outline-2 outline-white ml-4 font-semibold  rounded-lg  focus:outline-none  transition duration-300 ease-in-out">
                        <MdOutlineReportProblem size={25} /> <span className='p-2'> </span>  Complaint
                    </button>
                </div>
                <div className=" flex flex-col text-white items-center">
                    <button onClick={navigateToUserSummaryPage} className=" w-auto mt-2 hover:bg-white hover:text-slate-900 p-2  outline outline-2 outline-white ml-4 font-semibold text-sm lg:text-xl rounded-lg flex flex-row   focus:outline-none  transition duration-300 ease-in-out">
                        <PiFilesBold size={25} /> <span className='p-1'></span> Summary
                    </button>
                </div>
            </div>
        </nav >
    );
};
export default UserNavbar;
