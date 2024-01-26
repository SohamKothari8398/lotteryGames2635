import React, { } from 'react';
import { BsFillClipboard2DataFill } from 'react-icons/bs';
import { TbSettingsShare } from 'react-icons/tb';
import { FaUserSecret, FaBriefcase, FaUser, FaWallet, FaGamepad } from 'react-icons/fa';
import { PiFilesBold, PiPokerChipFill } from 'react-icons/pi';
import { AiFillControl } from 'react-icons/ai';
import { HiGift } from 'react-icons/hi';
import { BiSolidOffer } from 'react-icons/bi';
import { GiReceiveMoney, GiPayMoney, GiCoins } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import GetWalletBalance from '../UsersPanel/WalletBalance';

// Component
function AdminControlBar() {
    const { user } = useAuthContext();
    // Navigator
    const navigate = useNavigate();

    const navigateToAdminDepositApprovalsPage = () => {
        navigate('/admin/adminDepositApprovalsPage');
    }

    const navigateToAdminWithdrawalApprovalsPage = () => {
        navigate('/admin/adminWithdrawalApprovalsPage');
    }

    const navigateToAllRecordsPage = () => {
        navigate('/admin/allRecords');
    }
    const navigateToCreateGiftCardPage = () => {
        navigate('/admin/createGiftCard');
    }

    const navigateToUsersRecordsPage = () => {
        navigate('/admin/adminPlayersRecord');
    }
    const navigateToAgentsRecordsPage = () => {
        navigate('/admin/agentsRecords');
    }
    const navigateToGiftCardsRecordsPage = () => {
        navigate('/admin/allGiftCards');
    }

    const navigateToUsersComplaintsPage = () => {
        navigate('/admin/usersComplaints');
    }

    const navigateToAdminSettingsPage = () => {
        navigate('/admin/settings');
    }
    const navigateToUserSettingsPage = () => {
        navigate('/admin/userSettings');
    }
    const navigateToAgentSettingsPage = () => {
        navigate('/admin/agentSettings');
    }
    const navigateToGamesSettingsPage = () => {
        navigate('/admin/gamesSettings');
    }
    const navigateToOffersSettingsPage = () => {
        navigate('/admin/OffersSettings');
    }
    const navigateToAdminSummaryPage = () => {
        navigate('/admin/summaryReportsStatements');
    }

    const navigateToAdminSpecialOffers = () => {
        navigate('/admin/adminSpecialOffers');
    }

    const navigateToAdminPromotionsAdsPage = () => {
        navigate('/admin/setThemes');
    }

    return (
        <nav className="bg-slate-900 text-white mb-1 p-4 md:top-[6vh] lg:top-[11vh] xl:top-[2vh] top-[11vh] z-10">
            <div className="container mx-auto grid grid-cols-3 md:grid-cols-6 gap-8 justify-between items-center text-2xl sm:text-xl md:text-xl">
                <div className="flex flex-col text-white items-center m-auto hover:bg-slate-900 text-white-600 font-bold p-2 text-sm lg:text-xl rounded-lg  focus:outline-none  transition duration-300 ease-in-out">
                    <span className='p-2 flex flex-row border-b-4'><FaWallet size={25} />
                        <GetWalletBalance />
                    </span>
                </div>
                <div className="flex flex-col text-white items-center hover:bg-white rounded-lg hover:text-slate-900">
                    <button onClick={navigateToAdminDepositApprovalsPage} className="p-2 m-2 font-semibold rounded-lg flex flex-row">
                        <GiReceiveMoney size={35} className='mr-2' />
                        <div className="flex flex-col text-sm font-bold">
                            <div>Deposit</div>
                            <div>Approval</div>
                        </div>
                    </button>
                </div>
                <div className="flex flex-col text-white items-center hover:bg-white rounded-lg hover:text-slate-900">
                    <button onClick={navigateToAdminWithdrawalApprovalsPage} className=" p-2 m-2 font-semibold rounded-lg flex flex-row">
                        <GiPayMoney size={35} className='mr-2' />
                        <div className="flex flex-col text-sm font-bold">
                            <div>Withdrawal</div>
                            <div>Approval</div>
                        </div>
                    </button>
                </div>

                {/* <div className="flex flex-col text-white items-center hover:bg-white hover:text-slate-900 rounded-lg">
                    <button onClick={navigateToAdminSettingsPage} className="w-auto m-2 p-2 flex flex-row">
                        <GiCoins size={35} className='mr-2' />
                        <div className="flex flex-col text-sm font-bold">
                            <div>Custom</div>
                            <div>Bets</div>
                        </div>
                    </button>
                </div> */}
                <div className="flex flex-col text-white items-center hover:bg-white hover:text-slate-900 rounded-lg">
                    <button onClick={navigateToAgentSettingsPage} className="w-auto m-2 p-2 flex flex-row">
                        <FaUserSecret size={35} className='mr-2' />
                        <div className="flex flex-col text-sm font-bold">
                            <div>Agent</div>
                            <div>Settings</div>
                        </div>
                    </button>
                </div>
                {/* <div className="flex flex-col text-white items-center hover:bg-white hover:text-slate-900 rounded-lg">
                    <button onClick={navigateToOffersSettingsPage} className="w-auto m-2 p-2 flex flex-row">
                        <BiSolidOffer size={35} className='mr-2' />
                        <div className="flex flex-col text-sm font-bold">
                            <div>Offers</div>
                            <div>Settings</div>
                        </div>
                    </button>
                </div>
                <div className="flex flex-col text-white items-center hover:bg-white hover:text-slate-900 rounded-lg">
                    <button onClick={navigateToGamesSettingsPage} className="w-auto m-2 p-2 flex flex-row">
                        <FaGamepad size={35} className='mr-2' />
                        <div className="flex flex-col text-sm font-bold">
                            <div>Game</div>
                            <div>Settings</div>
                        </div>
                    </button>
                </div> */}
                <div className="flex flex-col text-white items-center hover:bg-white hover:text-slate-900 rounded-lg">
                    <button onClick={navigateToUserSettingsPage} className="w-auto m-2 p-2 flex flex-row">
                        <FaUser size={35} className='mr-2' />
                        <div className="flex flex-col text-sm font-bold">
                            <div>Users</div>
                            <div>Settings</div>
                        </div>
                    </button>
                </div>
                <div className="flex flex-col text-white items-center hover:bg-white hover:text-slate-900 rounded-lg">
                    <button onClick={navigateToUsersComplaintsPage} className="w-auto m-2 p-2 flex flex-row">
                        <FaBriefcase size={35} className='mr-2' />
                        <div className="flex flex-col text-sm font-bold">
                            <div>Users</div>
                            <div>Complaints</div>
                        </div>
                    </button>
                </div>
                <div className="flex flex-col text-white items-center hover:bg-white hover:text-slate-900 rounded-lg">
                    <button onClick={navigateToUsersRecordsPage} className="w-auto m-2 p-2 flex flex-row">
                        <BsFillClipboard2DataFill size={35} className='mr-2' />
                        <div className="flex flex-col text-sm font-bold">
                            <div>Users</div>
                            <div>Records</div>
                        </div>
                    </button>
                </div>
                <div className="flex flex-col text-white items-center hover:bg-white hover:text-slate-900 rounded-lg">
                    <button onClick={navigateToAgentsRecordsPage} className="w-auto m-2 p-2 flex flex-row">
                        <BsFillClipboard2DataFill size={35} className='mr-2' />
                        <div className="flex flex-col text-sm font-bold">
                            <div>Agents</div>
                            <div>Records</div>
                        </div>
                    </button>
                </div>
                {/* <div className="flex flex-col text-white items-center hover:bg-white hover:text-slate-900 rounded-lg">
                    <button onClick={navigateToUsersRecordsPage} className="w-auto m-2 p-2 flex flex-row">
                        <BsFillClipboard2DataFill size={35} className='mr-2' />
                        <div className="flex flex-col text-sm font-bold">
                            <div>Bets</div>
                            <div>Records</div>
                        </div>
                    </button>
                </div> */}
                <div className="flex flex-col text-white items-center hover:bg-white hover:text-slate-900 rounded-lg">
                    <button onClick={navigateToGiftCardsRecordsPage} className="w-auto m-2 p-2 flex flex-row">
                        <BsFillClipboard2DataFill size={35} className='mr-2' />
                        <div className="flex flex-col text-sm font-bold">
                            <div>Gift</div>
                            <div>Records</div>
                        </div>
                    </button>
                </div>
                {/* <div className="flex flex-col text-white items-center hover:bg-white hover:text-slate-900 rounded-lg">
                    <button onClick={navigateToAllRecordsPage} className="w-auto m-2 p-2 flex flex-row">
                        <BsFillClipboard2DataFill size={35} className='mr-2' />
                        <div className="flex flex-col text-sm font-bold">
                            <div>All Admin</div>
                            <div>Records</div>
                        </div>
                    </button>
                </div> */}

                <div className="flex flex-col text-white items-center hover:bg-white hover:text-slate-900 rounded-lg">
                    <button onClick={navigateToAdminPromotionsAdsPage} className="w-auto m-2 p-2 flex flex-row">
                        <AiFillControl size={35} className='mr-2' />
                        <div className="flex flex-col text-sm font-bold">
                            <div>Theme</div>
                            <div>Panel</div>
                        </div>
                    </button>
                </div>
                <div className="flex flex-col text-white items-center hover:bg-white hover:text-slate-900 rounded-lg">
                    <button onClick={navigateToCreateGiftCardPage} className="w-auto m-2 p-2 flex flex-row">
                        <HiGift size={35} className='mr-2' />
                        <div className="flex flex-col text-sm md:text-md lg:text-lg font-bold">
                            <div>Gift</div>
                            <div>Cards</div>
                        </div>
                    </button>
                </div>
                {/* <div className=" flex flex-col text-white items-center">
                    <button className=" w-auto mt-2 hover:bg-white hover:text-slate-900 p-2 ml-4 font-semibold text-sm lg:text-xl rounded-lg flex flex-row  ">
                        <MdFiberNew size={25} /> <span className='p-1'></span> New
                    </button>
                </div> */}
                {/* <div className="flex flex-col text-white items-center hover:bg-white hover:text-slate-900 rounded-lg">
                    <button onClick={navigateToAdminSettingsPage} className="w-auto m-2 p-2 flex flex-row">
                        <TbSettingsShare size={35} className='mr-2' />
                        <div className="flex flex-col text-sm font-bold">
                            <div>Admin</div>
                            <div>Settings</div>
                        </div>
                    </button>
                </div> */}
                <div className="flex flex-col text-white items-center hover:bg-white hover:text-slate-900 rounded-lg">
                    <button onClick={navigateToAdminSummaryPage} className="p-2 m-2 font-semibold rounded-lg flex flex-row">
                        <PiFilesBold size={35} className='mr-2' />
                        <div className="flex flex-col text-sm font-bold">
                            <div>Full App</div>
                            <div>Summary</div>
                        </div>
                    </button>
                </div>
            </div>
        </nav >
    );
};
export default AdminControlBar;
