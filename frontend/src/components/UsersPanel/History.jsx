import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import { useAuthContext } from '../../hooks/useAuthContext';

function UserHistory() {
    const { user } = useAuthContext();
    const [showBetsHistory, setshowBetsHistory] = useState('');
    const [betsHistoryTable, setBetsHistoryTable] = useState('');
    const navigate = useNavigate();
    const navigateToUserHome = () => {
        navigate(-1);
    }
    const handleshowBetsHistory = () => {
        setshowBetsHistory(!showBetsHistory);
    }
    return (
        <div className="top-0 left-0 right-0 w-auto h-auto bottom-0 flex flex-col bg-slate-900 items-center pb-24">
            <h1 className="text-2xl md:text-4xl font-bold text-center mt-12 text-white underline underline-offset-8 italic">History</h1>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 text-center w-full md:w-1/2 h-auto text-white font-bold mt-8">
                <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col hover:scale-125 hover:border-4 hover:bg-blue-500">
                    <div>Wallet Balance(in INR)</div>
                    <div className="bg-white rounded-lg text-black p-4 m-2">{user.walletBalance}</div>
                </div>
                <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col hover:scale-125 hover:border-4 hover:bg-blue-500">
                    <div>Total Games Played</div>
                    <div className="bg-white rounded-lg text-black p-4 m-2 hover:border-4 ">{user.gamesPlayed}</div>
                </div>
                <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col hover:scale-125 hover:border-4 hover:bg-blue-500">
                    <div>Games Won</div>
                    <div className="bg-white rounded-lg text-black p-4 m-2 hover:border-4">{user.gamesWon}</div>
                </div>
                <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col hover:scale-125 hover:border-4 hover:bg-blue-500">
                    <div>Active Games</div>
                    <div className="bg-white rounded-lg text-black p-4 m-2 hover:border-4">{user.gamesActive}</div>
                </div>
            </div>
            <div className="w-full flex flex-col mt-8 h-auto text-white items-center">
                <div onClick={handleshowBetsHistory} className="text-center font-semibold bg-black rounded-lg text-md md:text-lg lg:text-xl p-4 my-4 flex flex-row">My Bets<MdOutlineArrowDropDownCircle size={35} className='ml-4' /></div>
                <div className='w-11/12 h-auto'>
                    {showBetsHistory ? (<div className="w-full lg:w-auto h-auto overflow-x-auto lg:overflow-hidden rounded-lg text-white items-center">
                        <table className="table-auto h-auto text-sm text-slate-900 border-4">
                            <thead className="bg-black text-white font-bold">
                                <tr>
                                    <th className="py-3 text-center border-2 px-6">ID</th>
                                    <th className="py-3 text-center border-2 px-6">Complaint-ID</th>
                                    <th className="py-3 text-center border-2 px-6">Date</th>
                                    <th className="py-3 text-center border-2 px-6">Time</th>
                                    <th className="py-3 text-center border-2 px-6">User-ID</th>
                                    <th className="py-3 text-center border-2 px-6">Game Name</th>
                                    <th className="py-3 text-center border-2 px-6">Complaint Type</th>
                                    <th className="py-3 text-center border-2 px-6">Description Text</th>
                                    <th className="py-3 text-center border-2 px-6">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white text-black font-semibold">
                                <tr>
                                    <td className="py-3 text-center border-2 px-6">1</td>
                                    <td className="py-3 text-center border-2 px-6">30/10/202320:13:44ABCDabcd1234!@#$</td>
                                    <td className="py-3 text-center border-2 px-6">30/10/2023</td>
                                    <td className="py-3 text-center border-2 px-6">20:12:50</td>
                                    <td className="py-3 text-center border-2 px-6">ABCDabcd1234!@#$</td>
                                    <td className="py-3 text-center border-2 px-6">Single Digit Lottery</td>
                                    <td className="py-3 text-center border-2 px-6">Deposit</td>
                                    <td className="py-3 text-center border-2 px-6">Solve my Withdrawal Problem Admin Bro.</td>
                                    <td className="py-3 text-center border-2 px-6 bg-green-500">Solved</td>
                                </tr>
                                <tr className='bg-black'>
                                    <td className="py-3 text-center border-2 px-6"></td>
                                    <td className="py-3 text-center border-2 px-6"></td>
                                    <td className="py-3 text-center border-2 px-6"></td>
                                    <td className="py-3 text-center border-2 px-6"></td>
                                    <td className="py-3 text-center border-2 px-6"></td>
                                    <td className="py-3 text-center border-2 px-6"></td>
                                    <td className="py-3 text-center border-2 px-6"></td>
                                    <td className="py-3 text-center border-2 px-6"></td>
                                    <td className="py-3 text-center border-2 px-6"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>) : (<></>)}
                </div>
            </div>
            <div className="fixed top-1 right-1 bg-black hover:bg-green-600 text-white shadow-md shadow-white m-2 p-2 rounded-lg">
                <button onClick={navigateToUserHome}>
                    <FaHome size={30} />
                </button>
            </div>
        </div >
    )
}

export default UserHistory;