import React from 'react';
import { BsFillClipboard2DataFill, BsDatabaseFillAdd } from 'react-icons/bs';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { MdOutlineReportProblem } from 'react-icons/md';
import { TbSettingsShare } from 'react-icons/tb';
import { FaUserSecret, FaWallet } from 'react-icons/fa';
import { PiFilesBold } from 'react-icons/pi';
import { GiWallet } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import GetWalletBalance from '../UsersPanel/WalletBalance';

function AgentsControlBar() {
    const { user } = useAuthContext();
    // Navigator
    const navigate = useNavigate();

    // const navigateToCreateGiftCardPage = () => {
    //     navigate('/agent/createGiftCard');
    // }
    const navigateToSubAdminSettingsPage = () => {
        navigate('/agent/settings');
    }
    const navigateToSubAdminUserRecords = () => {
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

    const navigateToUserWithdrawPage = () => {
        navigate('/withdraw');
    };

    return (
        <nav className=" mb-1 p-4 md:top-[6vh] lg:top-[11vh] xl:top-[2vh] top-[11vh] z-10">
            <div className="container mx-auto grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 justify-between items-center text-2xl sm:text-xl md:text-xl">
                <div className="flex flex-col text-white items-center m-auto hover:bg-slate-900 text-white-600 font-bold p-2 text-sm lg:text-xl rounded-lg  focus:outline-none  transition duration-300 ease-in-out">
                    <span className='p-2 flex flex-row border-b-4'><FaWallet size={25} />
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
                    <button onClick={navigateToUserWallet} className="  w-auto mt-2 hover:bg-white text-sm lg:text-xl hover:text-slate-900 p-2 flex flex-row outline outline-2 outline-white ml-4 font-semibold  rounded-lg  focus:outline-none  transition duration-300 ease-in-out">
                        <GiWallet size={25} /> <span className='p-2'> </span>  Wallet
                    </button>
                </div>
                <div className="flex flex-col text-white items-center">
                    <button onClick={navigateToUserAddComplaintsPage} className="  w-auto mt-2 hover:bg-white text-sm lg:text-xl hover:text-slate-900 p-2 flex flex-row outline outline-2 outline-white ml-4 font-semibold  rounded-lg  focus:outline-none  transition duration-300 ease-in-out">
                        <MdOutlineReportProblem size={25} /> <span className='p-2'> </span>  Complaint
                    </button>
                </div>
                <div className="flex flex-col text-white items-center hover:bg-white hover:text-slate-900 rounded-lg">
                    <button onClick={navigateToAddUserCredentials} className="p-2 m-2 font-semibold rounded-lg flex flex-row">
                        <FaUserSecret size={35} className='mr-2' />
                        <div className="flex flex-col text-sm md:text-md lg:text-lg font-bold">
                            <div>Create</div>
                            <div>User</div>
                        </div>
                    </button>
                </div>
                <div className="flex flex-col text-white items-center hover:bg-white hover:text-slate-900 rounded-lg">
                    <button onClick={navigateToSubAdminUserRecords} className="w-auto m-2 p-2 flex flex-row">
                        <BsFillClipboard2DataFill size={35} className='mr-2' />
                        <div className="flex flex-col text-sm md:text-md lg:text-lg font-bold">
                            <div>Users</div>
                            <div>Records</div>
                        </div>
                    </button>
                </div>

                <div className="flex flex-col text-white items-center">
                    <button onClick={navigateToSubAdminSettingsPage} className="  w-auto mt-2 hover:bg-white text-sm lg:text-xl hover:text-slate-900 p-2 flex flex-row outline outline-2 outline-white ml-4 font-semibold  rounded-lg  focus:outline-none  transition duration-300 ease-in-out">
                        <TbSettingsShare size={25} /> <span className='p-2'> </span>  Settings
                    </button>
                </div>
                <div className="flex flex-col text-white items-center">
                    <button onClick={navigateToAgentSummaryPage} className="  w-auto mt-2 hover:bg-white text-sm lg:text-xl hover:text-slate-900 p-2 flex flex-row outline outline-2 outline-white ml-4 font-semibold  rounded-lg  focus:outline-none  transition duration-300 ease-in-out">
                        <PiFilesBold size={25} /> <span className='p-2'> </span>  Summary
                    </button>
                </div>
                {/* <div className="flex flex-col text-white items-center hover:bg-white hover:text-slate-900 rounded-lg">
                    <button onClick={navigateToAllRecords} className="w-auto m-2 p-2 flex flex-row">
                        <BsFillClipboard2DataFill size={35} className='mr-2' />
                        <div className="flex flex-col text-sm md:text-md lg:text-lg font-bold">
                            <div>All</div>
                            <div>Records</div>
                        </div>
                    </button>
                </div> */}
                {/* <div className="flex flex-col text-white items-center hover:bg-white hover:text-slate-900 rounded-lg">
                    <button onClick={navigateToCreateGiftCardPage} className="w-auto m-2 p-2 flex flex-row">
                        <HiGift size={35} className='mr-2' />
                        <div className="flex flex-col text-sm md:text-md lg:text-lg font-bold">
                            <div>Gift</div>
                            <div>Cards</div>    
                        </div>
                    </button>
                </div> */}
                {/* <div className="flex flex-col text-white items-center hover:bg-white hover:text-slate-900 rounded-lg">
                    <button onClick={navigateToAgentSummaryPage} className="w-auto m-2 p-2 flex flex-row font-bold">
                        <PiFilesBold size={25} /> <span className='p-1'></span> Summary
                    </button>
                </div> */}
            </div>
        </nav >
    );
}

export default AgentsControlBar;