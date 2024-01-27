import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaWindowClose } from 'react-icons/fa';
import { useAuthContext } from '../../hooks/useAuthContext';
import { format } from 'date-fns';
import GetWalletBalance from '../UsersPanel/WalletBalance';
import { useService } from '../../hooks/useService';

function UserWallet() {
    const { user } = useAuthContext();
    const service = useService()
    const [tableData, setTableData] = useState([]);
    const navigate = useNavigate();
    const navigateToUserHome = () => {
        navigate(-1);
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await service.get(`/user/wallet?userId=${user.userID}`);
                if (!response) alert("Response Data Not Received.");
                setTableData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [tableData, user.userID]);

    return (
        <div className="px-10 pb-10 flex flex-col bg-slate-900 items-center">
            <div className="text-2xl md:text-4xl lg:text-6xl font-bold text-center mt-12 text-white underline underline-offset-8 italic">My Wallet</div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 text-center text-white font-bold mt-8">
                <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col hover:scale-125 hover:border-4 hover:bg-blue-500">
                    <div>Wallet Balance(in INR)</div>
                    <div className="bg-white rounded-lg text-black p-4 m-2"><GetWalletBalance /></div>
                </div>
                <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col hover:scale-125 hover:border-4 hover:bg-blue-500">
                    <div>Total Games Played</div>
                    <div className="bg-white rounded-lg text-black p-4 m-2 hover:border-4 hover:border-blue-500 hover:text-blue-500">{user.gamesPlayed}</div>
                </div>
                <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col hover:scale-125 hover:border-4 hover:bg-blue-500">
                    <div>Games Won</div>
                    <div className="bg-white rounded-lg text-black p-4 m-2 hover:border-4 hover:border-green-500 hover:text-green-500">{user.gamesWon}</div>
                </div>
                <div className="bg-black m-2 p-2 rounded-lg w-auto h-auto flex flex-col hover:scale-125 hover:border-4 hover:bg-blue-500">
                    <div>Active Games</div>
                    <div className="bg-white rounded-lg text-black p-4 m-2 hover:border-4 hover:border-yellow-500 hover:text-yellow-500">{user.gamesActive}</div>
                </div>
            </div>
            <div className="text-center font-semibold  bg-black text-white rounded-lg text-lg md:text-xl lg:text-2xl p-4 my-4 flex flex-row">Transactions
            </div>
            <div className="w-full lg:w-auto h-auto overflow-x-auto lg:overflow-hidden rounded-lg text-white items-center">
                <table className="table-auto h-auto text-sm text-slate-900 border-4">
                    <thead className="bg-black text-white font-bold">
                        <tr>
                            <th className="py-3 text-center border-4 px-6">ID</th>
                            <th className="py-3 text-center border-4 px-6">Transaction-ID</th>
                            <th className="py-3 text-center border-4 px-6">Date</th>
                            <th className="py-3 text-center border-4 px-6">Time</th>
                            <th className="py-3 text-center border-4 px-6">User-ID</th>
                            <th className="py-3 text-center border-4 px-6">Amount</th>
                            <th className="py-3 text-center border-4 px-6">Type</th>
                            <th className="py-3 text-center border-4 px-6">Admin Remarks</th>
                            <th className="py-3 text-center border-4 px-6">Status</th>
                        </tr>
                    </thead>
                    <tbody >
                        {tableData.map((row, index) => (
                            <tr key={index} className="bg-white font-semibold">
                                <td className='py-3 text-center border-2 px-6'>{index}</td>
                                <td className='py-3 text-center border-2 px-6'>{row._id}</td>
                                <td className="py-3 text-center border-2 px-6">{format(new Date(row.createdAt), 'yyyy-MM-dd')}</td>
                                <td className="py-3 text-center border-2 px-6">{format(new Date(row.createdAt), 'HH:mm:s')}</td>
                                <td className='py-3 text-center border-2 px-6'>{row.mobileNumber}</td>
                                <td className='py-3 text-center border-2 px-6'>{row.amount}</td>
                                <td className='py-3 text-center border-2 px-6'>{row.transactionType}</td>
                                <td className='py-3 text-center border-2 px-6'>{row.adminRemarks}</td>
                                <td className={`py-3 text-center font-bold border-2 px-6 text-white hover:scale-125
                                        ${row.status === 'Success' || row.status === "Received" ? 'bg-teal-800' : row.status === 'Pending' ? 'bg-yellow-400' :
                                        row.status === 'Rejected' ? 'bg-red-600' : 'bg-white'}`
                                }>
                                    {row.status}
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-black">
                            <td className='border-4 p-4'></td>
                            <td className='border-4 p-4'></td>
                            <td className='border-4 p-4'></td>
                            <td className='border-4 p-4'></td>
                            <td className='border-4 p-4'></td>
                            <td className='border-4 p-4'></td>
                            <td className='border-4 p-4'></td>
                            <td className='border-4 p-4'></td>
                            <td className='border-4 p-4'></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button onClick={navigateToUserHome} className="absolute text-red-500 rounded-lg bg-white top-2 right-4 z-10 ">
                <FaWindowClose size={30} className='shadow-lg shadow-red-500' />
            </button>
        </div >
    )
}

export default UserWallet