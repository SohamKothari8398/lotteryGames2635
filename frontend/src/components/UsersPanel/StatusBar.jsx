import React from 'react';
import { BsDatabaseFillAdd } from 'react-icons/bs';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { MdOutlineReportProblem } from 'react-icons/md';
import { PiFilesBold } from 'react-icons/pi';
import { FaWallet } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import GetWalletBalance from '../UsersPanel/WalletBalance';

function UserStatusBar() {
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

    return (
        <nav className="bg-slate-900 text-white mb-10 p-4 md:top-[6vh] lg:top-[11vh] xl:top-[2vh] top-[11vh] z-10">
            <div className="container mx-auto rounded-lg grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 justify-between items-center text-2xl sm:text-xl md:text-xl">
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

export default UserStatusBar;